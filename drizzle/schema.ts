import { 
  integer, 
  pgEnum, 
  pgTable, 
  text, 
  timestamp, 
  varchar,
  numeric,
  boolean,
  json,
  serial
} from "drizzle-orm/pg-core";

/**
 * Enums
 */
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const projectStatusEnum = pgEnum("project_status", ["draft", "active", "completed", "archived"]);
export const bidStatusEnum = pgEnum("bid_status", ["draft", "sent", "accepted", "rejected", "expired"]);
export const invoiceStatusEnum = pgEnum("invoice_status", ["draft", "sent", "viewed", "paid", "overdue", "cancelled"]);
export const paymentMethodEnum = pgEnum("payment_method", ["card", "echeck", "bank_transfer", "cash", "other"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "completed", "failed", "refunded"]);
export const reminderTypeEnum = pgEnum("reminder_type", ["due_date", "overdue_1day", "overdue_7days", "custom"]);
export const documentTypeEnum = pgEnum("document_type", ["invoice", "bid"]);

/**
 * Core user table backing auth flow.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Clients table - stores contractor's clients/customers
 */
export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zipCode: varchar("zipCode", { length: 20 }),
  country: varchar("country", { length: 100 }),
  companyName: varchar("companyName", { length: 255 }),
  notes: text("notes"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

/**
 * Item catalog - commonly used materials and services with pricing
 */
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  unit: varchar("unit", { length: 50 }),
  cost: numeric("cost", { precision: 10, scale: 2 }).notNull(),
  markupPercentage: numeric("markupPercentage", { precision: 5, scale: 2 }).default("0"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Item = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;

/**
 * Projects table - tracks contractor projects/jobs
 */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  clientId: integer("clientId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: projectStatusEnum("status").default("draft").notNull(),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  estimatedBudget: numeric("estimatedBudget", { precision: 10, scale: 2 }),
  actualCost: numeric("actualCost", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Bids/Estimates table - proposal documents for projects
 */
export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  projectId: integer("projectId").notNull(),
  clientId: integer("clientId").notNull(),
  bidNumber: varchar("bidNumber", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: bidStatusEnum("status").default("draft").notNull(),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  validUntil: timestamp("validUntil"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Bid = typeof bids.$inferSelect;
export type InsertBid = typeof bids.$inferInsert;

/**
 * Bid line items - individual line items within a bid
 */
export const bidLineItems = pgTable("bidLineItems", {
  id: serial("id").primaryKey(),
  bidId: integer("bidId").notNull(),
  itemId: integer("itemId"),
  description: varchar("description", { length: 255 }).notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: numeric("unitPrice", { precision: 10, scale: 2 }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 10, scale: 2 }).notNull(),
  section: varchar("section", { length: 100 }),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BidLineItem = typeof bidLineItems.$inferSelect;
export type InsertBidLineItem = typeof bidLineItems.$inferInsert;

/**
 * Invoices table - billing documents for completed work
 */
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  projectId: integer("projectId").notNull(),
  clientId: integer("clientId").notNull(),
  bidId: integer("bidId"),
  invoiceNumber: varchar("invoiceNumber", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: invoiceStatusEnum("status").default("draft").notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: numeric("tax", { precision: 10, scale: 2 }).default("0"),
  totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
  notes: text("notes"),
  dueDate: timestamp("dueDate"),
  sentDate: timestamp("sentDate"),
  paidDate: timestamp("paidDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

/**
 * Invoice line items - individual line items within an invoice
 */
export const invoiceLineItems = pgTable("invoiceLineItems", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoiceId").notNull(),
  itemId: integer("itemId"),
  description: varchar("description", { length: 255 }).notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: numeric("unitPrice", { precision: 10, scale: 2 }).notNull(),
  totalPrice: numeric("totalPrice", { precision: 10, scale: 2 }).notNull(),
  section: varchar("section", { length: 100 }),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type InvoiceLineItem = typeof invoiceLineItems.$inferSelect;
export type InsertInvoiceLineItem = typeof invoiceLineItems.$inferInsert;

/**
 * Payments table - tracks payments received for invoices
 */
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  invoiceId: integer("invoiceId").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: paymentMethodEnum("paymentMethod").notNull(),
  transactionId: varchar("transactionId", { length: 255 }),
  status: paymentStatusEnum("status").default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Payment reminders table - tracks automated payment reminders
 */
export const paymentReminders = pgTable("paymentReminders", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  invoiceId: integer("invoiceId").notNull(),
  reminderType: reminderTypeEnum("reminderType").notNull(),
  sentDate: timestamp("sentDate"),
  nextReminderDate: timestamp("nextReminderDate"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PaymentReminder = typeof paymentReminders.$inferSelect;
export type InsertPaymentReminder = typeof paymentReminders.$inferInsert;

/**
 * Document templates table - customizable templates for invoices and bids
 */
export const documentTemplates = pgTable("documentTemplates", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: documentTypeEnum("type").notNull(),
  content: text("content"),
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type DocumentTemplate = typeof documentTemplates.$inferSelect;
export type InsertDocumentTemplate = typeof documentTemplates.$inferInsert;

/**
 * Business settings table - contractor's business information and settings
 */
export const businessSettings = pgTable("businessSettings", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull().unique(),
  businessName: varchar("businessName", { length: 255 }),
  businessEmail: varchar("businessEmail", { length: 320 }),
  businessPhone: varchar("businessPhone", { length: 20 }),
  businessAddress: text("businessAddress"),
  businessCity: varchar("businessCity", { length: 100 }),
  businessState: varchar("businessState", { length: 50 }),
  businessZipCode: varchar("businessZipCode", { length: 20 }),
  businessCountry: varchar("businessCountry", { length: 100 }),
  taxId: varchar("taxId", { length: 50 }),
  logo: text("logo"),
  defaultPaymentTerms: integer("defaultPaymentTerms").default(30),
  defaultTaxRate: numeric("defaultTaxRate", { precision: 5, scale: 2 }).default("0"),
  currency: varchar("currency", { length: 10 }).default("USD"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type BusinessSettings = typeof businessSettings.$inferSelect;
export type InsertBusinessSettings = typeof businessSettings.$inferInsert;
