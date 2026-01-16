import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";

// ============ VALIDATION SCHEMAS ============

const createClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  companyName: z.string().optional(),
  notes: z.string().optional(),
});

const createItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  unit: z.string().optional(),
  cost: z.string().transform(v => parseFloat(v)),
  markupPercentage: z.string().transform(v => parseFloat(v)).optional(),
  price: z.string().transform(v => parseFloat(v)),
});

const createProjectSchema = z.object({
  clientId: z.number(),
  name: z.string().min(1),
  description: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  estimatedBudget: z.string().transform(v => parseFloat(v)).optional(),
});

const createBidSchema = z.object({
  projectId: z.number(),
  clientId: z.number(),
  title: z.string().min(1),
  description: z.string().optional(),
  validUntil: z.date().optional(),
});

const bidLineItemSchema = z.object({
  itemId: z.number().optional(),
  description: z.string().min(1),
  quantity: z.string().transform(v => parseFloat(v)),
  unitPrice: z.string().transform(v => parseFloat(v)),
  section: z.string().optional(),
});

const createInvoiceSchema = z.object({
  projectId: z.number(),
  clientId: z.number(),
  bidId: z.number().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.date().optional(),
});

const invoiceLineItemSchema = z.object({
  itemId: z.number().optional(),
  description: z.string().min(1),
  quantity: z.string().transform(v => parseFloat(v)),
  unitPrice: z.string().transform(v => parseFloat(v)),
  section: z.string().optional(),
});

const createPaymentSchema = z.object({
  invoiceId: z.number(),
  amount: z.string().transform(v => parseFloat(v)),
  paymentMethod: z.enum(["card", "echeck", "bank_transfer", "cash", "other"]),
  transactionId: z.string().optional(),
  notes: z.string().optional(),
});

// ============ CLIENT ROUTER ============

const clientRouter = router({
  create: protectedProcedure
    .input(createClientSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await db.createClient(ctx.user.id, input);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create client",
        });
      }
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db.listClientsByUser(ctx.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list clients",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const client = await db.getClientById(input.id, ctx.user.id);
      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Client not found",
        });
      }
      return client;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.number(), ...createClientSchema.shape }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const client = await db.getClientById(id, ctx.user.id);
      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Client not found",
        });
      }
      await db.updateClient(id, ctx.user.id, data);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const client = await db.getClientById(input.id, ctx.user.id);
      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Client not found",
        });
      }
      await db.deleteClient(input.id, ctx.user.id);
      return { success: true };
    }),
});

// ============ ITEM ROUTER ============

const itemRouter = router({
  create: protectedProcedure
    .input(createItemSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await db.createItem(ctx.user.id, input as any);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create item",
        });
      }
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db.listItemsByUser(ctx.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list items",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const item = await db.getItemById(input.id, ctx.user.id);
      if (!item) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item not found",
        });
      }
      return item;
    }),

  update: protectedProcedure
    .input(z.object({ id: z.number(), ...createItemSchema.shape }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const item = await db.getItemById(id, ctx.user.id);
      if (!item) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item not found",
        });
      }
      await db.updateItem(id, ctx.user.id, data as any);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const item = await db.getItemById(input.id, ctx.user.id);
      if (!item) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Item not found",
        });
      }
      await db.deleteItem(input.id, ctx.user.id);
      return { success: true };
    }),
});

// ============ PROJECT ROUTER ============

const projectRouter = router({
  create: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const client = await db.getClientById(input.clientId, ctx.user.id);
      if (!client) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Client not found",
        });
      }
      try {
        await db.createProject(ctx.user.id, input as any);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
        });
      }
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db.listProjectsByUser(ctx.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list projects",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const project = await db.getProjectById(input.id, ctx.user.id);
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      return project;
    }),

  update: protectedProcedure
    .input(z.object({ 
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(["draft", "active", "completed", "archived"]).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      estimatedBudget: z.string().transform(v => parseFloat(v)).optional(),
      actualCost: z.string().transform(v => parseFloat(v)).optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const project = await db.getProjectById(id, ctx.user.id);
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      const updateData: Record<string, any> = {};
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          updateData[key] = value;
        }
      });
      await db.updateProject(id, ctx.user.id, updateData as any);
      return { success: true };
    }),
});

// ============ BID ROUTER ============

const bidRouter = router({
  create: protectedProcedure
    .input(createBidSchema)
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProjectById(input.projectId, ctx.user.id);
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const settings = await db.getBusinessSettings(ctx.user.id);
      const bidNumber = `${settings?.bidPrefix || "EST"}-${settings?.nextBidNumber || 1001}`;

      try {
        await db.createBid(ctx.user.id, {
          ...input,
          bidNumber,
          totalAmount: "0" as any,
        } as any);

        if (settings) {
          await db.createOrUpdateBusinessSettings(ctx.user.id, {
            nextBidNumber: ((settings.nextBidNumber || 1001) + 1) as any,
          });
        }

        return { success: true, bidNumber, bidId: 0 };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create bid",
        });
      }
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db.listBidsByUser(ctx.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list bids",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const bid = await db.getBidById(input.id, ctx.user.id);
      if (!bid) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bid not found",
        });
      }
      const lineItems = await db.listBidLineItems(input.id);
      return { ...bid, lineItems };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(["draft", "sent", "accepted", "rejected", "expired"]).optional(),
      notes: z.string().optional(),
      validUntil: z.date().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const bid = await db.getBidById(id, ctx.user.id);
      if (!bid) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bid not found",
        });
      }
      await db.updateBid(id, ctx.user.id, data);
      return { success: true };
    }),

  addLineItem: protectedProcedure
    .input(z.object({
      bidId: z.number(),
      ...bidLineItemSchema.shape,
    }))
    .mutation(async ({ ctx, input }) => {
      const bid = await db.getBidById(input.bidId, ctx.user.id);
      if (!bid) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bid not found",
        });
      }

      const totalPrice = parseFloat(input.quantity.toString()) * parseFloat(input.unitPrice.toString());
      const lineItems = await db.listBidLineItems(input.bidId);

      await db.createBidLineItem({
        bidId: input.bidId,
        itemId: input.itemId,
        description: input.description,
        quantity: parseFloat(input.quantity.toString()) as any,
        unitPrice: parseFloat(input.unitPrice.toString()) as any,
        totalPrice: totalPrice as any,
        section: input.section,
        sortOrder: lineItems.length,
      });

      const newTotal = lineItems.reduce((sum, item) => sum + parseFloat(item.totalPrice.toString()), 0) + totalPrice;
      await db.updateBid(input.bidId, ctx.user.id, { totalAmount: newTotal as any });

      return { success: true };
    }),

  updateLineItem: protectedProcedure
    .input(z.object({
      lineItemId: z.number(),
      bidId: z.number(),
      description: z.string().optional(),
      quantity: z.string().transform(v => parseFloat(v)).optional(),
      unitPrice: z.string().transform(v => parseFloat(v)).optional(),
      section: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const bid = await db.getBidById(input.bidId, ctx.user.id);
      if (!bid) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bid not found",
        });
      }

      const lineItems = await db.listBidLineItems(input.bidId);
      const lineItem = lineItems.find(li => li.id === input.lineItemId);
      if (!lineItem) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Line item not found",
        });
      }

      const quantity = input.quantity ?? parseFloat(lineItem.quantity.toString());
      const unitPrice = input.unitPrice ?? parseFloat(lineItem.unitPrice.toString());
      const totalPrice = quantity * unitPrice;

      await db.updateBidLineItem(input.lineItemId, {
        description: input.description,
        quantity: quantity as any,
        unitPrice: unitPrice as any,
        totalPrice: totalPrice as any,
        section: input.section,
      });

      const newTotal = lineItems.reduce((sum, item) => {
        if (item.id === input.lineItemId) {
          return sum + totalPrice;
        }
        return sum + parseFloat(item.totalPrice.toString());
      }, 0);

      await db.updateBid(input.bidId, ctx.user.id, { totalAmount: newTotal as any });

      return { success: true };
    }),

  deleteLineItem: protectedProcedure
    .input(z.object({ lineItemId: z.number(), bidId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const bid = await db.getBidById(input.bidId, ctx.user.id);
      if (!bid) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Bid not found",
        });
      }

      const lineItems = await db.listBidLineItems(input.bidId);
      const lineItem = lineItems.find(li => li.id === input.lineItemId);
      if (!lineItem) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Line item not found",
        });
      }

      await db.deleteBidLineItem(input.lineItemId);

      const newTotal = lineItems
        .filter(li => li.id !== input.lineItemId)
        .reduce((sum, item) => sum + parseFloat(item.totalPrice.toString()), 0);

      await db.updateBid(input.bidId, ctx.user.id, { totalAmount: newTotal as any });

      return { success: true };
    }),
});

// ============ INVOICE ROUTER ============

const invoiceRouter = router({
  create: protectedProcedure
    .input(createInvoiceSchema)
    .mutation(async ({ ctx, input }) => {
      const project = await db.getProjectById(input.projectId, ctx.user.id);
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const settings = await db.getBusinessSettings(ctx.user.id);
      const invoiceNumber = `${settings?.invoicePrefix || "INV"}-${settings?.nextInvoiceNumber || 1001}`;

      try {
        await db.createInvoice(ctx.user.id, {
          ...input,
          invoiceNumber,
          subtotal: "0" as any,
          totalAmount: "0" as any,
        } as any);

        if (settings) {
          await db.createOrUpdateBusinessSettings(ctx.user.id, {
            nextInvoiceNumber: ((settings.nextInvoiceNumber || 1001) + 1) as any,
          });
        }

        return { success: true, invoiceNumber, invoiceId: 0 };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create invoice",
        });
      }
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db.listInvoicesByUser(ctx.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list invoices",
      });
    }
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const invoice = await db.getInvoiceById(input.id, ctx.user.id);
      if (!invoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }
      const lineItems = await db.listInvoiceLineItems(input.id);
      const payments = await db.listPaymentsByInvoice(input.id, ctx.user.id);
      return { ...invoice, lineItems, payments };
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(["draft", "sent", "viewed", "paid", "overdue", "cancelled"]).optional(),
      notes: z.string().optional(),
      dueDate: z.date().optional(),
      paidDate: z.date().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const invoice = await db.getInvoiceById(id, ctx.user.id);
      if (!invoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }
      await db.updateInvoice(id, ctx.user.id, data);
      return { success: true };
    }),

  addLineItem: protectedProcedure
    .input(z.object({
      invoiceId: z.number(),
      ...invoiceLineItemSchema.shape,
    }))
    .mutation(async ({ ctx, input }) => {
      const invoice = await db.getInvoiceById(input.invoiceId, ctx.user.id);
      if (!invoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      const totalPrice = parseFloat(input.quantity.toString()) * parseFloat(input.unitPrice.toString());
      const lineItems = await db.listInvoiceLineItems(input.invoiceId);

      await db.createInvoiceLineItem({
        invoiceId: input.invoiceId,
        itemId: input.itemId,
        description: input.description,
        quantity: parseFloat(input.quantity.toString()) as any,
        unitPrice: parseFloat(input.unitPrice.toString()) as any,
        totalPrice: totalPrice as any,
        section: input.section,
        sortOrder: lineItems.length,
      });

      const subtotal = lineItems.reduce((sum, item) => sum + parseFloat(item.totalPrice.toString()), 0) + totalPrice;
      const settings = await db.getBusinessSettings(ctx.user.id);
      const taxRate = settings?.defaultTaxRate ? parseFloat(settings.defaultTaxRate.toString()) : 0;
      const tax = (subtotal * taxRate) / 100;
      const totalAmount = subtotal + tax;

      await db.updateInvoice(input.invoiceId, ctx.user.id, {
        subtotal: subtotal as any,
        tax: tax as any,
        totalAmount: totalAmount as any,
      });

      return { success: true };
    }),

  updateLineItem: protectedProcedure
    .input(z.object({
      lineItemId: z.number(),
      invoiceId: z.number(),
      description: z.string().optional(),
      quantity: z.string().transform(v => parseFloat(v)).optional(),
      unitPrice: z.string().transform(v => parseFloat(v)).optional(),
      section: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const invoice = await db.getInvoiceById(input.invoiceId, ctx.user.id);
      if (!invoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      const lineItems = await db.listInvoiceLineItems(input.invoiceId);
      const lineItem = lineItems.find(li => li.id === input.lineItemId);
      if (!lineItem) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Line item not found",
        });
      }

      const quantity = input.quantity ?? parseFloat(lineItem.quantity.toString());
      const unitPrice = input.unitPrice ?? parseFloat(lineItem.unitPrice.toString());
      const totalPrice = quantity * unitPrice;

      await db.updateInvoiceLineItem(input.lineItemId, {
        description: input.description,
        quantity: quantity as any,
        unitPrice: unitPrice as any,
        totalPrice: totalPrice as any,
        section: input.section,
      });

      const subtotal = lineItems.reduce((sum, item) => {
        if (item.id === input.lineItemId) {
          return sum + totalPrice;
        }
        return sum + parseFloat(item.totalPrice.toString());
      }, 0);

      const settings = await db.getBusinessSettings(ctx.user.id);
      const taxRate = settings?.defaultTaxRate ? parseFloat(settings.defaultTaxRate.toString()) : 0;
      const tax = (subtotal * taxRate) / 100;
      const totalAmount = subtotal + tax;

      await db.updateInvoice(input.invoiceId, ctx.user.id, {
        subtotal: subtotal as any,
        tax: tax as any,
        totalAmount: totalAmount as any,
      });

      return { success: true };
    }),

  deleteLineItem: protectedProcedure
    .input(z.object({ lineItemId: z.number(), invoiceId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const invoice = await db.getInvoiceById(input.invoiceId, ctx.user.id);
      if (!invoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      const lineItems = await db.listInvoiceLineItems(input.invoiceId);
      const lineItem = lineItems.find(li => li.id === input.lineItemId);
      if (!lineItem) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Line item not found",
        });
      }

      await db.deleteInvoiceLineItem(input.lineItemId);

      const subtotal = lineItems
        .filter(li => li.id !== input.lineItemId)
        .reduce((sum, item) => sum + parseFloat(item.totalPrice.toString()), 0);

      const settings = await db.getBusinessSettings(ctx.user.id);
      const taxRate = settings?.defaultTaxRate ? parseFloat(settings.defaultTaxRate.toString()) : 0;
      const tax = (subtotal * taxRate) / 100;
      const totalAmount = subtotal + tax;

      await db.updateInvoice(input.invoiceId, ctx.user.id, {
        subtotal: subtotal as any,
        tax: tax as any,
        totalAmount: totalAmount as any,
      });

      return { success: true };
    }),
});

// ============ PAYMENT ROUTER ============

const paymentRouter = router({
  create: protectedProcedure
    .input(createPaymentSchema)
    .mutation(async ({ ctx, input }) => {
      const invoice = await db.getInvoiceById(input.invoiceId, ctx.user.id);
      if (!invoice) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      try {
        await db.createPayment(ctx.user.id, {
          ...input,
          amount: input.amount as any,
          status: "completed",
        });

        const totalPaid = (parseFloat(invoice.totalAmount.toString()) || 0);
        const newStatus = totalPaid >= parseFloat(invoice.totalAmount.toString()) ? "paid" : "viewed";

        await db.updateInvoice(input.invoiceId, ctx.user.id, {
          status: newStatus as any,
          paidDate: new Date(),
        });

        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create payment",
        });
      }
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await db.listPaymentsByUser(ctx.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to list payments",
      });
    }
  }),
});

// ============ BUSINESS SETTINGS ROUTER ============

const settingsRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    try {
      const settings = await db.getBusinessSettings(ctx.user.id);
      return settings || {};
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get settings",
      });
    }
  }),

  update: protectedProcedure
    .input(z.object({
      businessName: z.string().optional(),
      businessEmail: z.string().optional(),
      businessPhone: z.string().optional(),
      businessAddress: z.string().optional(),
      businessCity: z.string().optional(),
      businessState: z.string().optional(),
      businessZipCode: z.string().optional(),
      businessCountry: z.string().optional(),
      taxId: z.string().optional(),
      logo: z.string().optional(),
      defaultCurrency: z.string().optional(),
      defaultTaxRate: z.string().transform(v => parseFloat(v)).optional(),
      invoicePrefix: z.string().optional(),
      bidPrefix: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const data: Record<string, any> = {};
        Object.entries(input).forEach(([key, value]) => {
          if (value !== undefined) {
            data[key] = value;
          }
        });
        await db.createOrUpdateBusinessSettings(ctx.user.id, data as any);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update settings",
        });
      }
    }),
});

// ============ AI ASSISTANT ROUTER ============

const aiRouter = router({
  generateEstimate: protectedProcedure
    .input(z.object({
      projectDescription: z.string(),
      clientName: z.string().optional(),
      scope: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are an expert contractor assistant. Generate professional, detailed project estimates based on project descriptions. Include itemized breakdown of labor, materials, and costs. Format as JSON with items array containing description, quantity, unit, and estimated cost.",
            },
            {
              role: "user",
              content: `Generate an estimate for this project:\n\nClient: ${input.clientName || "New Client"}\n\nProject Description: ${input.projectDescription}\n\nScope: ${input.scope || "General work"}\n\nProvide a detailed breakdown with labor, materials, and other costs.`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "estimate",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  items: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        description: { type: "string" },
                        quantity: { type: "number" },
                        unit: { type: "string" },
                        unitPrice: { type: "number" },
                      },
                      required: ["description", "quantity", "unit", "unitPrice"],
                    },
                  },
                  notes: { type: "string" },
                },
                required: ["title", "items"],
              },
            },
          },
        });

        const content = response.choices[0]?.message.content;
        if (typeof content === "string") {
          return JSON.parse(content);
        }
        return content;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate estimate",
        });
      }
    }),

  generateDescription: protectedProcedure
    .input(z.object({
      itemName: z.string(),
      context: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are a professional contractor assistant. Write clear, concise descriptions for invoice and estimate line items.",
            },
            {
              role: "user",
              content: `Write a professional description for this line item:\n\nItem: ${input.itemName}\n\nContext: ${input.context || "General service"}\n\nKeep it brief but descriptive.`,
            },
          ],
        });

        return {
          description: response.choices[0]?.message.content || input.itemName,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate description",
        });
      }
    }),

  chat: protectedProcedure
    .input(z.object({
      message: z.string(),
      conversationHistory: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const messages = [
          {
            role: "system" as const,
            content: "You are ContractorPro AI Assistant, a helpful assistant for contractors and freelancers. Help with project planning, estimation, invoicing advice, and business management. Be professional and concise.",
          },
          ...(input.conversationHistory || []).map(msg => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
          {
            role: "user" as const,
            content: input.message,
          },
        ];

        const response = await invokeLLM({ messages });

        return {
          reply: response.choices[0]?.message.content || "I'm unable to respond at the moment.",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to process chat message",
        });
      }
    }),
});

// ============ NOTIFICATION ROUTER ============

const notificationRouter = router({
  list: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      try {
        return await db.listNotificationsByUser(ctx.user.id, input.limit);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch notifications",
        });
      }
    }),

  unreadCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      const count = await db.getUnreadNotificationCount(ctx.user.id);
      return { count };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch unread count",
      });
    }
  }),

  markAsRead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.markNotificationAsRead(input.id, ctx.user.id);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to mark notification as read",
        });
      }
    }),

  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await db.markAllNotificationsAsRead(ctx.user.id);
      return { success: true };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to mark all notifications as read",
      });
    }
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.deleteNotification(input.id, ctx.user.id);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete notification",
        });
      }
    }),

  getPreferences: protectedProcedure.query(async ({ ctx }) => {
    try {
      const prefs = await db.getNotificationPreferences(ctx.user.id);
      return prefs || {
        userId: ctx.user.id,
        emailOnPaymentReceived: true,
        emailOnPaymentOverdue: true,
        emailOnBidViewed: true,
        emailOnBidDecision: true,
        emailOnInvoiceSent: false,
        inAppNotifications: true,
        paymentReminderDaysBefore: 2,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch notification preferences",
      });
    }
  }),

  updatePreferences: protectedProcedure
    .input(z.object({
      emailOnPaymentReceived: z.boolean().optional(),
      emailOnPaymentOverdue: z.boolean().optional(),
      emailOnBidViewed: z.boolean().optional(),
      emailOnBidDecision: z.boolean().optional(),
      emailOnInvoiceSent: z.boolean().optional(),
      inAppNotifications: z.boolean().optional(),
      paymentReminderDaysBefore: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.createOrUpdateNotificationPreferences(ctx.user.id, input as any);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update notification preferences",
        });
      }
    }),
});

// ============ RESELLER ROUTER ============

const resellerRouter = router({
  create: protectedProcedure
    .input(z.object({
      companyName: z.string().min(1),
      domain: z.string().optional(),
      logo: z.string().optional(),
      primaryColor: z.string().optional(),
      secondaryColor: z.string().optional(),
      tier: z.enum(["starter", "pro", "enterprise"]),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.createReseller(ctx.user.id, input);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create reseller account",
        });
      }
    }),

  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const reseller = await db.getResellerByUserId(ctx.user.id);
        return reseller;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch reseller profile",
        });
      }
    }),

  updateStatus: protectedProcedure
    .input(z.object({
      resellerId: z.number(),
      status: z.enum(["pending", "active", "suspended", "inactive"]),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.updateResellerStatus(input.resellerId, input.status);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update reseller status",
        });
      }
    }),
});

// ============ SCHEDULING ROUTER ============

const schedulingRouter = router({
  createSchedule: protectedProcedure
    .input(z.object({
      projectId: z.number(),
      startDate: z.date(),
      endDate: z.date(),
      estimatedHours: z.number().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.createSchedule(ctx.user.id, input);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create schedule",
        });
      }
    }),

  assignCrew: protectedProcedure
    .input(z.object({
      scheduleId: z.number(),
      employeeId: z.number(),
      role: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.assignCrewToSchedule(input.scheduleId, input.employeeId, input.role);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to assign crew",
        });
      }
    }),

  getSchedules: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await db.getSchedulesByUserId(ctx.user.id);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch schedules",
        });
      }
    }),

  getCrewAssignments: protectedProcedure
    .input(z.object({ scheduleId: z.number() }))
    .query(async ({ input }) => {
      try {
        return await db.getCrewAssignmentsBySchedule(input.scheduleId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch crew assignments",
        });
      }
    }),

  connectCalendar: protectedProcedure
    .input(z.object({
      provider: z.enum(["google", "outlook", "ical"]),
      accessToken: z.string(),
      refreshToken: z.string().optional(),
      expiresAt: z.date().optional(),
      calendarId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.createCalendarIntegration(ctx.user.id, input);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to connect calendar",
        });
      }
    }),

  getCalendarIntegrations: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await db.getCalendarIntegrationsByUserId(ctx.user.id);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch calendar integrations",
        });
      }
    }),
});

// ============ MOBILE APP ROUTER ============

const mobileRouter = router({
  registerDevice: protectedProcedure
    .input(z.object({
      deviceId: z.string(),
      platform: z.enum(["ios", "android", "web"]),
      osVersion: z.string().optional(),
      appVersion: z.string().optional(),
      pushToken: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.registerMobileDevice(ctx.user.id, input);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to register device",
        });
      }
    }),

  getDevices: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await db.getMobileDevicesByUserId(ctx.user.id);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch devices",
        });
      }
    }),

  addOfflineSync: protectedProcedure
    .input(z.object({
      deviceId: z.string(),
      action: z.enum(["create", "update", "delete"]),
      entityType: z.string(),
      entityId: z.number(),
      data: z.any().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.addOfflineSyncItem(ctx.user.id, input.deviceId, {
          action: input.action,
          entityType: input.entityType,
          entityId: input.entityId,
          data: input.data,
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add offline sync item",
        });
      }
    }),

  getSyncQueue: protectedProcedure
    .input(z.object({ deviceId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await db.getOfflineSyncQueue(ctx.user.id, input.deviceId);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch sync queue",
        });
      }
    }),

  markSyncComplete: protectedProcedure
    .input(z.object({ syncItemId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        await db.markSyncItemAsProcessed(input.syncItemId);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to mark sync item as complete",
        });
      }
    }),

  getPreferences: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        return await db.getOrCreateAppPreferences(ctx.user.id);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch app preferences",
        });
      }
    }),

  updatePreferences: protectedProcedure
    .input(z.object({
      theme: z.enum(["light", "dark", "auto"]).optional(),
      notifications: z.boolean().optional(),
      biometricAuth: z.boolean().optional(),
      autoSync: z.boolean().optional(),
      offlineMode: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.updateAppPreferences(ctx.user.id, input);
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update app preferences",
        });
      }
    }),

  logActivity: protectedProcedure
    .input(z.object({
      deviceId: z.string(),
      action: z.string(),
      screen: z.string().optional(),
      metadata: z.any().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        await db.logAppActivity(ctx.user.id, input.deviceId, {
          action: input.action,
          screen: input.screen,
          metadata: input.metadata,
        });
        return { success: true };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to log activity",
        });
      }
    }),
});

// ============ MAIN ROUTER ============

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  clients: clientRouter,
  items: itemRouter,
  projects: projectRouter,
  bids: bidRouter,
  invoices: invoiceRouter,
  payments: paymentRouter,
  settings: settingsRouter,
  ai: aiRouter,
  notifications: notificationRouter,
  reseller: resellerRouter,
  scheduling: schedulingRouter,
  mobile: mobileRouter,
});

export type AppRouter = typeof appRouter;
