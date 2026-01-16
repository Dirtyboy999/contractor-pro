import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar,
  decimal,
  boolean,
  json,
  longtext
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Clients table - stores contractor's clients/customers
 */
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zipCode: varchar("zipCode", { length: 20 }),
  country: varchar("country", { length: 100 }),
  companyName: varchar("companyName", { length: 255 }),
  notes: longtext("notes"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

/**
 * Item catalog - commonly used materials and services with pricing
 */
export const items = mysqlTable("items", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  unit: varchar("unit", { length: 50 }), // e.g., "hour", "sq ft", "each"
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull(), // Material/labor cost
  markupPercentage: decimal("markupPercentage", { precision: 5, scale: 2 }).default("0"), // Profit margin
  price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Selling price
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Item = typeof items.$inferSelect;
export type InsertItem = typeof items.$inferInsert;

/**
 * Projects table - tracks contractor projects/jobs
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  clientId: int("clientId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: longtext("description"),
  status: mysqlEnum("status", ["draft", "active", "completed", "archived"]).default("draft").notNull(),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  estimatedBudget: decimal("estimatedBudget", { precision: 10, scale: 2 }),
  actualCost: decimal("actualCost", { precision: 10, scale: 2 }).default("0"),
  notes: longtext("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Bids/Estimates table - proposal documents for projects
 */
export const bids = mysqlTable("bids", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId").notNull(),
  clientId: int("clientId").notNull(),
  bidNumber: varchar("bidNumber", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: longtext("description"),
  status: mysqlEnum("status", ["draft", "sent", "accepted", "rejected", "expired"]).default("draft").notNull(),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
  notes: longtext("notes"),
  validUntil: timestamp("validUntil"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Bid = typeof bids.$inferSelect;
export type InsertBid = typeof bids.$inferInsert;

/**
 * Bid line items - individual line items within a bid
 */
export const bidLineItems = mysqlTable("bidLineItems", {
  id: int("id").autoincrement().primaryKey(),
  bidId: int("bidId").notNull(),
  itemId: int("itemId"), // Reference to item catalog (optional)
  description: varchar("description", { length: 255 }).notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal("unitPrice", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
  section: varchar("section", { length: 100 }), // For grouping line items
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BidLineItem = typeof bidLineItems.$inferSelect;
export type InsertBidLineItem = typeof bidLineItems.$inferInsert;

/**
 * Invoices table - billing documents for completed work
 */
export const invoices = mysqlTable("invoices", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId").notNull(),
  clientId: int("clientId").notNull(),
  bidId: int("bidId"), // Reference to original bid if converted
  invoiceNumber: varchar("invoiceNumber", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: longtext("description"),
  status: mysqlEnum("status", ["draft", "sent", "viewed", "paid", "overdue", "cancelled"]).default("draft").notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).default("0"),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull(),
  notes: longtext("notes"),
  dueDate: timestamp("dueDate"),
  sentDate: timestamp("sentDate"),
  paidDate: timestamp("paidDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;

/**
 * Invoice line items - individual line items within an invoice
 */
export const invoiceLineItems = mysqlTable("invoiceLineItems", {
  id: int("id").autoincrement().primaryKey(),
  invoiceId: int("invoiceId").notNull(),
  itemId: int("itemId"), // Reference to item catalog (optional)
  description: varchar("description", { length: 255 }).notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal("unitPrice", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
  section: varchar("section", { length: 100 }), // For grouping line items
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type InvoiceLineItem = typeof invoiceLineItems.$inferSelect;
export type InsertInvoiceLineItem = typeof invoiceLineItems.$inferInsert;

/**
 * Payments table - tracks payments received for invoices
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  invoiceId: int("invoiceId").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: mysqlEnum("paymentMethod", ["card", "echeck", "bank_transfer", "cash", "other"]).notNull(),
  transactionId: varchar("transactionId", { length: 255 }),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Payment reminders table - tracks automated payment reminders
 */
export const paymentReminders = mysqlTable("paymentReminders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  invoiceId: int("invoiceId").notNull(),
  reminderType: mysqlEnum("reminderType", ["due_date", "overdue_1day", "overdue_7days", "custom"]).notNull(),
  sentDate: timestamp("sentDate"),
  nextReminderDate: timestamp("nextReminderDate"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PaymentReminder = typeof paymentReminders.$inferSelect;
export type InsertPaymentReminder = typeof paymentReminders.$inferInsert;

/**
 * Document templates table - customizable templates for invoices and bids
 */
export const documentTemplates = mysqlTable("documentTemplates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["invoice", "bid"]).notNull(),
  content: longtext("content"), // HTML/JSON template content
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DocumentTemplate = typeof documentTemplates.$inferSelect;
export type InsertDocumentTemplate = typeof documentTemplates.$inferInsert;

/**
 * Business settings table - contractor's business information and settings
 */
export const businessSettings = mysqlTable("businessSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  businessName: varchar("businessName", { length: 255 }),
  businessEmail: varchar("businessEmail", { length: 320 }),
  businessPhone: varchar("businessPhone", { length: 20 }),
  businessAddress: text("businessAddress"),
  businessCity: varchar("businessCity", { length: 100 }),
  businessState: varchar("businessState", { length: 50 }),
  businessZipCode: varchar("businessZipCode", { length: 20 }),
  businessCountry: varchar("businessCountry", { length: 100 }),
  taxId: varchar("taxId", { length: 50 }),
  logo: varchar("logo", { length: 500 }), // URL to logo image
  defaultCurrency: varchar("defaultCurrency", { length: 3 }).default("USD"),
  defaultTaxRate: decimal("defaultTaxRate", { precision: 5, scale: 2 }).default("0"),
  invoicePrefix: varchar("invoicePrefix", { length: 20 }).default("INV"),
  bidPrefix: varchar("bidPrefix", { length: 20 }).default("EST"),
  nextInvoiceNumber: int("nextInvoiceNumber").default(1001),
  nextBidNumber: int("nextBidNumber").default(1001),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BusinessSettings = typeof businessSettings.$inferSelect;
export type InsertBusinessSettings = typeof businessSettings.$inferInsert;

/**
 * Notifications table - stores all user notifications
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", [
    "invoice_sent",
    "invoice_viewed",
    "payment_received",
    "payment_due_reminder",
    "payment_overdue",
    "bid_sent",
    "bid_viewed",
    "bid_accepted",
    "bid_rejected",
    "bid_expired",
    "project_created",
    "project_completed",
    "client_added",
    "item_low_stock",
    "system_alert",
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  relatedEntityType: varchar("relatedEntityType", { length: 50 }),
  relatedEntityId: int("relatedEntityId"),
  isRead: boolean("isRead").default(false).notNull(),
  sentViaEmail: boolean("sentViaEmail").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  readAt: timestamp("readAt"),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Notification preferences table - user settings for notifications
 */
export const notificationPreferences = mysqlTable("notificationPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  emailOnPaymentReceived: boolean("emailOnPaymentReceived").default(true).notNull(),
  emailOnPaymentOverdue: boolean("emailOnPaymentOverdue").default(true).notNull(),
  emailOnBidViewed: boolean("emailOnBidViewed").default(true).notNull(),
  emailOnBidDecision: boolean("emailOnBidDecision").default(true).notNull(),
  emailOnInvoiceSent: boolean("emailOnInvoiceSent").default(false).notNull(),
  inAppNotifications: boolean("inAppNotifications").default(true).notNull(),
  paymentReminderDaysBefore: int("paymentReminderDaysBefore").default(2).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NotificationPreference = typeof notificationPreferences.$inferSelect;
export type InsertNotificationPreference = typeof notificationPreferences.$inferInsert;


/**
 * Project photos table - stores photos for project progress tracking
 */
export const projectPhotos = mysqlTable("projectPhotos", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId").notNull(),
  photoUrl: varchar("photoUrl", { length: 500 }).notNull(),
  photoKey: varchar("photoKey", { length: 255 }).notNull(), // S3 key
  caption: text("caption"),
  photoType: mysqlEnum("photoType", ["before", "after", "progress", "completion"]).default("progress"),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProjectPhoto = typeof projectPhotos.$inferSelect;
export type InsertProjectPhoto = typeof projectPhotos.$inferInsert;

/**
 * Project phases table - tracks project phases with photos
 */
export const projectPhases = mysqlTable("projectPhases", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).default("not_started"),
  startDate: timestamp("startDate"),
  endDate: timestamp("endDate"),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProjectPhase = typeof projectPhases.$inferSelect;
export type InsertProjectPhase = typeof projectPhases.$inferInsert;

/**
 * Progress updates table - tracks project progress with photos and notes
 */
export const progressUpdates = mysqlTable("progressUpdates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId").notNull(),
  phaseId: int("phaseId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  percentComplete: int("percentComplete").default(0),
  photoId: int("photoId"), // Reference to projectPhotos
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProgressUpdate = typeof progressUpdates.$inferSelect;
export type InsertProgressUpdate = typeof progressUpdates.$inferInsert;

/**
 * Client portal access table - manages client access to portal
 */
export const clientPortalAccess = mysqlTable("clientPortalAccess", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  clientId: int("clientId").notNull(),
  accessToken: varchar("accessToken", { length: 255 }).notNull().unique(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  expiresAt: timestamp("expiresAt"),
});

export type ClientPortalAccess = typeof clientPortalAccess.$inferSelect;
export type InsertClientPortalAccess = typeof clientPortalAccess.$inferInsert;

/**
 * Email templates table - stores email templates for notifications
 */
export const emailTemplates = mysqlTable("emailTemplates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["invoice_sent", "bid_sent", "payment_reminder", "progress_update", "project_completion"]).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  htmlContent: longtext("htmlContent"),
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type InsertEmailTemplate = typeof emailTemplates.$inferInsert;


/**
 * Recurring invoices table - stores recurring invoice templates
 */
export const recurringInvoices = mysqlTable("recurringInvoices", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId"),
  clientId: int("clientId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  frequency: mysqlEnum("frequency", ["weekly", "biweekly", "monthly", "quarterly", "yearly"]).default("monthly").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  dueDay: int("dueDay").default(15), // Day of month to send invoice
  nextInvoiceDate: timestamp("nextInvoiceDate"),
  lastInvoiceDate: timestamp("lastInvoiceDate"),
  status: mysqlEnum("status", ["active", "paused", "cancelled"]).default("active").notNull(),
  invoicePrefix: varchar("invoicePrefix", { length: 20 }).default("REC"),
  maxOccurrences: int("maxOccurrences"), // null = unlimited
  occurrenceCount: int("occurrenceCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RecurringInvoice = typeof recurringInvoices.$inferSelect;
export type InsertRecurringInvoice = typeof recurringInvoices.$inferInsert;

/**
 * Payment methods table - stores customer payment methods
 */
export const paymentMethods = mysqlTable("paymentMethods", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  clientId: int("clientId").notNull(),
  type: mysqlEnum("type", ["stripe", "paypal", "chime", "bank_transfer", "echeck", "cash"]).notNull(),
  provider: varchar("provider", { length: 50 }), // stripe, paypal, chime
  providerPaymentMethodId: varchar("providerPaymentMethodId", { length: 255 }), // External ID from provider
  lastFourDigits: varchar("lastFourDigits", { length: 4 }),
  expiryMonth: int("expiryMonth"),
  expiryYear: int("expiryYear"),
  isDefault: boolean("isDefault").default(false),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PaymentMethod = typeof paymentMethods.$inferSelect;
export type InsertPaymentMethod = typeof paymentMethods.$inferInsert;

/**
 * Payment transactions table - detailed payment transaction records
 */
export const paymentTransactions = mysqlTable("paymentTransactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  invoiceId: int("invoiceId"),
  paymentMethodId: int("paymentMethodId"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD"),
  paymentGateway: mysqlEnum("paymentGateway", ["stripe", "paypal", "chime", "manual"]).notNull(),
  transactionId: varchar("transactionId", { length: 255 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  failureReason: text("failureReason"),
  receiptUrl: varchar("receiptUrl", { length: 500 }),
  metadata: json("metadata"), // Additional data from payment provider
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PaymentTransaction = typeof paymentTransactions.$inferSelect;
export type InsertPaymentTransaction = typeof paymentTransactions.$inferInsert;


/**
 * Expenses table - track business expenses
 */
export const expenses = mysqlTable("expenses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId"),
  category: varchar("category", { length: 100 }).notNull(),
  description: text("description"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
  receipt: varchar("receipt", { length: 500 }),
  taxDeductible: boolean("taxDeductible").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = typeof expenses.$inferInsert;

/**
 * Tax settings table - store tax configuration
 */
export const taxSettings = mysqlTable("taxSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  taxRate: decimal("taxRate", { precision: 5, scale: 2 }).default("0"),
  taxName: varchar("taxName", { length: 100 }).default("Sales Tax"),
  taxId: varchar("taxId", { length: 50 }),
  compoundTax: boolean("compoundTax").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TaxSettings = typeof taxSettings.$inferSelect;
export type InsertTaxSettings = typeof taxSettings.$inferInsert;

/**
 * Time entries table - track billable hours
 */
export const timeEntries = mysqlTable("timeEntries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId").notNull(),
  taskDescription: text("taskDescription"),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  duration: int("duration"), // in minutes
  hourlyRate: decimal("hourlyRate", { precision: 12, scale: 2 }),
  isBillable: boolean("isBillable").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TimeEntry = typeof timeEntries.$inferSelect;
export type InsertTimeEntry = typeof timeEntries.$inferInsert;

/**
 * Messages table - client communication hub
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  clientId: int("clientId").notNull(),
  projectId: int("projectId"),
  subject: varchar("subject", { length: 255 }),
  content: longtext("content").notNull(),
  isRead: boolean("isRead").default(false),
  attachments: json("attachments"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Workflows table - automated business workflows
 */
export const workflows = mysqlTable("workflows", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  trigger: mysqlEnum("trigger", ["invoice_created", "payment_received", "bid_sent", "project_completed", "manual"]).notNull(),
  actions: json("actions").notNull(), // Array of actions to execute
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflow = typeof workflows.$inferInsert;

/**
 * Team members table - manage team access
 */
export const teamMembers = mysqlTable("teamMembers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }),
  role: mysqlEnum("role", ["admin", "manager", "viewer", "editor"]).default("viewer").notNull(),
  permissions: json("permissions"), // Custom permissions
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = typeof teamMembers.$inferInsert;

/**
 * Custom fields table - store custom field definitions
 */
export const customFields = mysqlTable("customFields", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  entityType: mysqlEnum("entityType", ["invoice", "bid", "client", "project"]).notNull(),
  fieldName: varchar("fieldName", { length: 255 }).notNull(),
  fieldType: mysqlEnum("fieldType", ["text", "number", "date", "select", "checkbox"]).notNull(),
  options: json("options"), // For select fields
  isRequired: boolean("isRequired").default(false),
  displayOrder: int("displayOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomField = typeof customFields.$inferSelect;
export type InsertCustomField = typeof customFields.$inferInsert;

/**
 * Invoice templates table - customizable invoice templates
 */
export const invoiceTemplates = mysqlTable("invoiceTemplates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  logoUrl: varchar("logoUrl", { length: 500 }),
  primaryColor: varchar("primaryColor", { length: 7 }).default("#000000"),
  secondaryColor: varchar("secondaryColor", { length: 7 }).default("#FFFFFF"),
  fontFamily: varchar("fontFamily", { length: 100 }).default("Arial"),
  customHeader: longtext("customHeader"),
  customFooter: longtext("customFooter"),
  customFields: json("customFields"),
  isDefault: boolean("isDefault").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InvoiceTemplate = typeof invoiceTemplates.$inferSelect;
export type InsertInvoiceTemplate = typeof invoiceTemplates.$inferInsert;

/**
 * API keys table - for third-party integrations
 */
export const apiKeys = mysqlTable("apiKeys", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  keyName: varchar("keyName", { length: 255 }).notNull(),
  keyValue: varchar("keyValue", { length: 500 }).notNull().unique(),
  service: mysqlEnum("service", ["quickbooks", "zapier", "custom"]).notNull(),
  isActive: boolean("isActive").default(true),
  lastUsed: timestamp("lastUsed"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiKey = typeof apiKeys.$inferInsert;

/**
 * Webhooks table - for event notifications
 */
export const webhooks = mysqlTable("webhooks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  event: mysqlEnum("event", ["invoice.created", "payment.received", "bid.sent", "project.completed"]).notNull(),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Webhook = typeof webhooks.$inferSelect;
export type InsertWebhook = typeof webhooks.$inferInsert;

/**
 * Late fees table - track late payment fees
 */
export const lateFees = mysqlTable("lateFees", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  feePercentage: decimal("feePercentage", { precision: 5, scale: 2 }).default("0"),
  feeAmount: decimal("feeAmount", { precision: 12, scale: 2 }).default("0"),
  daysOverdue: int("daysOverdue").default(30),
  applyAutomatically: boolean("applyAutomatically").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LateFee = typeof lateFees.$inferSelect;
export type InsertLateFee = typeof lateFees.$inferInsert;


/**
 * Employees table - team members working for the contractor
 */
export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  role: varchar("role", { length: 100 }),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = typeof employees.$inferInsert;

/**
 * Geofences table - job site boundaries for location tracking
 */
export const geofences = mysqlTable("geofences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId"),
  name: varchar("name", { length: 255 }).notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  radiusMeters: int("radiusMeters").default(50).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Geofence = typeof geofences.$inferSelect;
export type InsertGeofence = typeof geofences.$inferInsert;

/**
 * Employee locations table - real-time GPS tracking
 */
export const employeeLocations = mysqlTable("employeeLocations", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  geofenceId: int("geofenceId"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  accuracy: decimal("accuracy", { precision: 8, scale: 2 }),
  isInsideGeofence: boolean("isInsideGeofence").default(false).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});
export type EmployeeLocation = typeof employeeLocations.$inferSelect;
export type InsertEmployeeLocation = typeof employeeLocations.$inferInsert;

/**
 * Attendance records table - tracks when employees are on site
 */
export const attendanceRecords = mysqlTable("attendanceRecords", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  geofenceId: int("geofenceId").notNull(),
  clockInTime: timestamp("clockInTime").notNull(),
  clockOutTime: timestamp("clockOutTime"),
  hoursWorked: decimal("hoursWorked", { precision: 8, scale: 2 }),
  isManualEntry: boolean("isManualEntry").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type AttendanceRecord = typeof attendanceRecords.$inferSelect;
export type InsertAttendanceRecord = typeof attendanceRecords.$inferInsert;

/**
 * Geofence alerts table - tracks geofence entry/exit events
 */
export const geofenceAlerts = mysqlTable("geofenceAlerts", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  geofenceId: int("geofenceId").notNull(),
  eventType: mysqlEnum("eventType", ["entry", "exit"]).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
});
export type GeofenceAlert = typeof geofenceAlerts.$inferSelect;
export type InsertGeofenceAlert = typeof geofenceAlerts.$inferInsert;

/**
 * Employee work sessions table - tracks daily work sessions
 */
export const workSessions = mysqlTable("workSessions", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull(),
  projectId: int("projectId"),
  date: varchar("date", { length: 10 }).notNull(),
  totalHours: decimal("totalHours", { precision: 8, scale: 2 }).notNull(),
  clockInCount: int("clockInCount").default(0),
  status: mysqlEnum("status", ["in-progress", "completed", "approved"]).default("in-progress").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type WorkSession = typeof workSessions.$inferSelect;
export type InsertWorkSession = typeof workSessions.$inferInsert;


/**
 * Payroll settings table - employee pay rates and deductions
 */
export const payrollSettings = mysqlTable("payrollSettings", {
  id: int("id").autoincrement().primaryKey(),
  employeeId: int("employeeId").notNull().unique(),
  hourlyRate: decimal("hourlyRate", { precision: 10, scale: 2 }).notNull(),
  overtimeRate: decimal("overtimeRate", { precision: 10, scale: 2 }),
  federalTaxRate: decimal("federalTaxRate", { precision: 5, scale: 2 }).default("12"),
  stateTaxRate: decimal("stateTaxRate", { precision: 5, scale: 2 }).default("5"),
  socialSecurityRate: decimal("socialSecurityRate", { precision: 5, scale: 2 }).default("6.2"),
  medicareRate: decimal("medicareRate", { precision: 5, scale: 2 }).default("1.45"),
  otherDeductions: decimal("otherDeductions", { precision: 10, scale: 2 }).default("0"),
  bankAccount: varchar("bankAccount", { length: 50 }),
  bankRoutingNumber: varchar("bankRoutingNumber", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type PayrollSetting = typeof payrollSettings.$inferSelect;
export type InsertPayrollSetting = typeof payrollSettings.$inferInsert;

/**
 * Payroll records table - tracks payroll runs and payments
 */
export const payrollRecords = mysqlTable("payrollRecords", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  employeeId: int("employeeId").notNull(),
  payPeriodStart: varchar("payPeriodStart", { length: 10 }).notNull(),
  payPeriodEnd: varchar("payPeriodEnd", { length: 10 }).notNull(),
  regularHours: decimal("regularHours", { precision: 8, scale: 2 }).notNull(),
  overtimeHours: decimal("overtimeHours", { precision: 8, scale: 2 }).default("0"),
  regularPay: decimal("regularPay", { precision: 12, scale: 2 }).notNull(),
  overtimePay: decimal("overtimePay", { precision: 12, scale: 2 }).default("0"),
  grossPay: decimal("grossPay", { precision: 12, scale: 2 }).notNull(),
  federalTax: decimal("federalTax", { precision: 12, scale: 2 }).default("0"),
  stateTax: decimal("stateTax", { precision: 12, scale: 2 }).default("0"),
  socialSecurityTax: decimal("socialSecurityTax", { precision: 12, scale: 2 }).default("0"),
  medicareTax: decimal("medicareTax", { precision: 12, scale: 2 }).default("0"),
  otherDeductions: decimal("otherDeductions", { precision: 12, scale: 2 }).default("0"),
  netPay: decimal("netPay", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["draft", "processed", "paid", "failed"]).default("draft").notNull(),
  paymentMethod: mysqlEnum("paymentMethod", ["direct-deposit", "check", "cash"]).default("direct-deposit").notNull(),
  paymentDate: timestamp("paymentDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type PayrollRecord = typeof payrollRecords.$inferSelect;
export type InsertPayrollRecord = typeof payrollRecords.$inferInsert;

/**
 * Job costing table - tracks actual costs per project
 */
export const jobCosts = mysqlTable("jobCosts", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull().unique(),
  estimatedLaborCost: decimal("estimatedLaborCost", { precision: 12, scale: 2 }).notNull(),
  actualLaborCost: decimal("actualLaborCost", { precision: 12, scale: 2 }).default("0"),
  estimatedMaterialCost: decimal("estimatedMaterialCost", { precision: 12, scale: 2 }).notNull(),
  actualMaterialCost: decimal("actualMaterialCost", { precision: 12, scale: 2 }).default("0"),
  estimatedEquipmentCost: decimal("estimatedEquipmentCost", { precision: 12, scale: 2 }).default("0"),
  actualEquipmentCost: decimal("actualEquipmentCost", { precision: 12, scale: 2 }).default("0"),
  estimatedOtherCost: decimal("estimatedOtherCost", { precision: 12, scale: 2 }).default("0"),
  actualOtherCost: decimal("actualOtherCost", { precision: 12, scale: 2 }).default("0"),
  totalEstimatedCost: decimal("totalEstimatedCost", { precision: 12, scale: 2 }).notNull(),
  totalActualCost: decimal("totalActualCost", { precision: 12, scale: 2 }).default("0"),
  profitMargin: decimal("profitMargin", { precision: 8, scale: 2 }),
  profitMarginPercent: decimal("profitMarginPercent", { precision: 5, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type JobCost = typeof jobCosts.$inferSelect;
export type InsertJobCost = typeof jobCosts.$inferInsert;

/**
 * Labor cost entries table - tracks individual labor costs
 */
export const laborCostEntries = mysqlTable("laborCostEntries", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  employeeId: int("employeeId").notNull(),
  date: varchar("date", { length: 10 }).notNull(),
  hours: decimal("hours", { precision: 8, scale: 2 }).notNull(),
  hourlyRate: decimal("hourlyRate", { precision: 10, scale: 2 }).notNull(),
  totalCost: decimal("totalCost", { precision: 12, scale: 2 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type LaborCostEntry = typeof laborCostEntries.$inferSelect;
export type InsertLaborCostEntry = typeof laborCostEntries.$inferInsert;

/**
 * Material cost entries table - tracks material costs per project
 */
export const materialCostEntries = mysqlTable("materialCostEntries", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  itemId: int("itemId"),
  date: varchar("date", { length: 10 }).notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unitCost: decimal("unitCost", { precision: 10, scale: 2 }).notNull(),
  totalCost: decimal("totalCost", { precision: 12, scale: 2 }).notNull(),
  supplier: varchar("supplier", { length: 255 }),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type MaterialCostEntry = typeof materialCostEntries.$inferSelect;
export type InsertMaterialCostEntry = typeof materialCostEntries.$inferInsert;


/**
 * Subscription plans table - defines pricing tiers
 */
export const subscriptionPlans = mysqlTable("subscriptionPlans", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  tier: mysqlEnum("tier", ["basic", "elite", "pro"]).notNull().unique(),
  monthlyPrice: decimal("monthlyPrice", { precision: 10, scale: 2 }).notNull(),
  annualPrice: decimal("annualPrice", { precision: 10, scale: 2 }),
  description: text("description"),
  features: json("features"),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SubscriptionPlan = typeof subscriptionPlans.$inferSelect;
export type InsertSubscriptionPlan = typeof subscriptionPlans.$inferInsert;

/**
 * User subscriptions table - tracks user subscription status
 */
export const userSubscriptions = mysqlTable("userSubscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  planId: int("planId").notNull(),
  status: mysqlEnum("status", ["trial", "active", "paused", "cancelled"]).default("trial").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  trialEndsAt: timestamp("trialEndsAt"),
  cancelledAt: timestamp("cancelledAt"),
  autoRenew: boolean("autoRenew").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type InsertUserSubscription = typeof userSubscriptions.$inferInsert;

/**
 * Referral codes table - tracks referral links and rewards
 */
export const referralCodes = mysqlTable("referralCodes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  referralLink: varchar("referralLink", { length: 500 }).notNull(),
  totalReferrals: int("totalReferrals").default(0).notNull(),
  totalRewardsMonths: int("totalRewardsMonths").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ReferralCode = typeof referralCodes.$inferSelect;
export type InsertReferralCode = typeof referralCodes.$inferInsert;

/**
 * Referral tracking table - tracks successful referrals
 */
export const referralTracking = mysqlTable("referralTracking", {
  id: int("id").autoincrement().primaryKey(),
  referrerId: int("referrerId").notNull(),
  referralCode: varchar("referralCode", { length: 50 }).notNull(),
  newUserId: int("newUserId").notNull(),
  rewardMonths: int("rewardMonths").default(1).notNull(),
  rewardApplied: boolean("rewardApplied").default(false).notNull(),
  rewardAppliedAt: timestamp("rewardAppliedAt"),
  status: mysqlEnum("status", ["pending", "completed", "expired"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ReferralTracking = typeof referralTracking.$inferSelect;
export type InsertReferralTracking = typeof referralTracking.$inferInsert;

/**
 * Billing history table - tracks invoices and payments
 */
export const billingHistory = mysqlTable("billingHistory", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  subscriptionId: int("subscriptionId").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("USD").notNull(),
  status: mysqlEnum("status", ["pending", "paid", "failed", "refunded"]).default("pending").notNull(),
  stripeInvoiceId: varchar("stripeInvoiceId", { length: 255 }),
  invoiceUrl: varchar("invoiceUrl", { length: 500 }),
  paidAt: timestamp("paidAt"),
  failedAt: timestamp("failedAt"),
  periodStart: timestamp("periodStart").notNull(),
  periodEnd: timestamp("periodEnd").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type BillingHistory = typeof billingHistory.$inferSelect;
export type InsertBillingHistory = typeof billingHistory.$inferInsert;



/**
 * Financing settings table - contractor financing preferences
 */
export const financingSettings = mysqlTable("financingSettings", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  financingEnabled: boolean("financingEnabled").default(true).notNull(),
  affirm: boolean("affirm").default(true).notNull(),
  klarna: boolean("klarna").default(true).notNull(),
  lendingClub: boolean("lendingClub").default(true).notNull(),
  minFinancingAmount: decimal("minFinancingAmount", { precision: 12, scale: 2 }).default("500"),
  maxFinancingAmount: decimal("maxFinancingAmount", { precision: 12, scale: 2 }).default("50000"),
  commissionPercentage: decimal("commissionPercentage", { precision: 5, scale: 2 }).default("2.5"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type FinancingSettings = typeof financingSettings.$inferSelect;
export type InsertFinancingSettings = typeof financingSettings.$inferInsert;

/**
 * Financing requests table - customer financing applications
 */
export const financingRequests = mysqlTable("financingRequests", {
  id: int("id").autoincrement().primaryKey(),
  invoiceId: int("invoiceId").notNull(),
  clientId: int("clientId").notNull(),
  userId: int("userId").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  lendingPartner: mysqlEnum("lendingPartner", ["affirm", "klarna", "lendingClub"]).notNull(),
  monthlyPayment: decimal("monthlyPayment", { precision: 12, scale: 2 }),
  interestRate: decimal("interestRate", { precision: 5, scale: 2 }),
  term: int("term").default(24).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "rejected", "completed", "cancelled"]).default("pending").notNull(),
  externalFinancingId: varchar("externalFinancingId", { length: 255 }),
  contractorCommission: decimal("contractorCommission", { precision: 12, scale: 2 }),
  contractorPaid: boolean("contractorPaid").default(false).notNull(),
  paidAt: timestamp("paidAt"),
  appliedAt: timestamp("appliedAt"),
  approvedAt: timestamp("approvedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type FinancingRequest = typeof financingRequests.$inferSelect;
export type InsertFinancingRequest = typeof financingRequests.$inferInsert;

/**
 * Financing payments table - tracks customer payments on financed jobs
 */
export const financingPayments = mysqlTable("financingPayments", {
  id: int("id").autoincrement().primaryKey(),
  financingRequestId: int("financingRequestId").notNull(),
  paymentNumber: int("paymentNumber").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  dueDate: timestamp("dueDate").notNull(),
  paidDate: timestamp("paidDate"),
  status: mysqlEnum("status", ["pending", "paid", "late", "failed"]).default("pending").notNull(),
  externalPaymentId: varchar("externalPaymentId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type FinancingPayment = typeof financingPayments.$inferSelect;
export type InsertFinancingPayment = typeof financingPayments.$inferInsert;

/**
 * Financing commissions table - tracks contractor commissions from financing
 */
export const financingCommissions = mysqlTable("financingCommissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  financingRequestId: int("financingRequestId").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "paid", "cancelled"]).default("pending").notNull(),
  paidAt: timestamp("paidAt"),
  stripePayoutId: varchar("stripePayoutId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type FinancingCommission = typeof financingCommissions.$inferSelect;
export type InsertFinancingCommission = typeof financingCommissions.$inferInsert;


/**
 * White-Label Reseller Program Tables
 */

/**
 * Resellers table - stores reseller account information
 */
export const resellers = mysqlTable("resellers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  domain: varchar("domain", { length: 255 }).unique(),
  logo: text("logo"),
  primaryColor: varchar("primaryColor", { length: 7 }),
  secondaryColor: varchar("secondaryColor", { length: 7 }),
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }).default("30.00").notNull(),
  totalClients: int("totalClients").default(0).notNull(),
  monthlyRevenue: decimal("monthlyRevenue", { precision: 12, scale: 2 }).default("0.00").notNull(),
  status: mysqlEnum("status", ["pending", "active", "suspended", "inactive"]).default("pending").notNull(),
  tier: mysqlEnum("tier", ["starter", "pro", "enterprise"]).default("starter").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Reseller = typeof resellers.$inferSelect;
export type InsertReseller = typeof resellers.$inferInsert;

/**
 * Reseller clients - tracks clients under each reseller
 */
export const resellerClients = mysqlTable("resellerClients", {
  id: int("id").autoincrement().primaryKey(),
  resellerId: int("resellerId").notNull(),
  clientId: int("clientId").notNull(),
  monthlyFee: decimal("monthlyFee", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["active", "paused", "cancelled"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ResellerClient = typeof resellerClients.$inferSelect;
export type InsertResellerClient = typeof resellerClients.$inferInsert;

/**
 * Reseller commissions - tracks commission payouts
 */
export const resellerCommissions = mysqlTable("resellerCommissions", {
  id: int("id").autoincrement().primaryKey(),
  resellerId: int("resellerId").notNull(),
  month: varchar("month", { length: 7 }).notNull(),
  totalRevenue: decimal("totalRevenue", { precision: 12, scale: 2 }).notNull(),
  commissionAmount: decimal("commissionAmount", { precision: 12, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "processed", "paid"]).default("pending").notNull(),
  paidAt: timestamp("paidAt"),
  stripePayoutId: varchar("stripePayoutId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ResellerCommission = typeof resellerCommissions.$inferSelect;
export type InsertResellerCommission = typeof resellerCommissions.$inferInsert;

/**
 * Advanced Scheduling Tables
 */

/**
 * Schedules table - stores project schedules
 */
export const schedules = mysqlTable("schedules", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectId: int("projectId").notNull(),
  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  estimatedHours: int("estimatedHours"),
  actualHours: int("actualHours"),
  status: mysqlEnum("status", ["scheduled", "in_progress", "completed", "cancelled"]).default("scheduled").notNull(),
  notes: longtext("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Schedule = typeof schedules.$inferSelect;
export type InsertSchedule = typeof schedules.$inferInsert;

/**
 * Crew assignments - assigns crew members to schedules
 */
export const crewAssignments = mysqlTable("crewAssignments", {
  id: int("id").autoincrement().primaryKey(),
  scheduleId: int("scheduleId").notNull(),
  employeeId: int("employeeId").notNull(),
  role: varchar("role", { length: 100 }),
  assignedAt: timestamp("assignedAt").defaultNow().notNull(),
  confirmedAt: timestamp("confirmedAt"),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type CrewAssignment = typeof crewAssignments.$inferSelect;
export type InsertCrewAssignment = typeof crewAssignments.$inferInsert;

/**
 * Calendar integrations - stores connected calendar accounts
 */
export const calendarIntegrations = mysqlTable("calendarIntegrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  provider: mysqlEnum("provider", ["google", "outlook", "ical"]).notNull(),
  accessToken: text("accessToken").notNull(),
  refreshToken: text("refreshToken"),
  expiresAt: timestamp("expiresAt"),
  calendarId: varchar("calendarId", { length: 255 }),
  syncEnabled: boolean("syncEnabled").default(true).notNull(),
  lastSyncAt: timestamp("lastSyncAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type CalendarIntegration = typeof calendarIntegrations.$inferSelect;
export type InsertCalendarIntegration = typeof calendarIntegrations.$inferInsert;

/**
 * Route optimizations - stores optimized routes for crews
 */
export const routeOptimizations = mysqlTable("routeOptimizations", {
  id: int("id").autoincrement().primaryKey(),
  scheduleId: int("scheduleId").notNull(),
  optimizedRoute: json("optimizedRoute"),
  estimatedTravelTime: int("estimatedTravelTime"),
  estimatedDistance: decimal("estimatedDistance", { precision: 10, scale: 2 }),
  fuelCostEstimate: decimal("fuelCostEstimate", { precision: 10, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type RouteOptimization = typeof routeOptimizations.$inferSelect;
export type InsertRouteOptimization = typeof routeOptimizations.$inferInsert;

/**
 * Mobile App Tables
 */

/**
 * Mobile devices - tracks registered mobile devices
 */
export const mobileDevices = mysqlTable("mobileDevices", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  deviceId: varchar("deviceId", { length: 255 }).unique().notNull(),
  platform: mysqlEnum("platform", ["ios", "android", "web"]).notNull(),
  osVersion: varchar("osVersion", { length: 50 }),
  appVersion: varchar("appVersion", { length: 50 }),
  pushToken: text("pushToken"),
  isActive: boolean("isActive").default(true).notNull(),
  lastActiveAt: timestamp("lastActiveAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type MobileDevice = typeof mobileDevices.$inferSelect;
export type InsertMobileDevice = typeof mobileDevices.$inferInsert;

/**
 * Offline sync queue - queues changes for offline sync
 */
export const offlineSyncQueue = mysqlTable("offlineSyncQueue", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  deviceId: varchar("deviceId", { length: 255 }).notNull(),
  action: mysqlEnum("action", ["create", "update", "delete"]).notNull(),
  entityType: varchar("entityType", { length: 100 }).notNull(),
  entityId: int("entityId").notNull(),
  data: json("data"),
  synced: boolean("synced").default(false).notNull(),
  syncedAt: timestamp("syncedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type OfflineSyncQueue = typeof offlineSyncQueue.$inferSelect;
export type InsertOfflineSyncQueue = typeof offlineSyncQueue.$inferInsert;

/**
 * App preferences - stores user preferences for mobile app
 */
export const appPreferences = mysqlTable("appPreferences", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  deviceId: varchar("deviceId", { length: 255 }),
  theme: mysqlEnum("theme", ["light", "dark", "auto"]).default("auto").notNull(),
  notifications: boolean("notifications").default(true).notNull(),
  biometricAuth: boolean("biometricAuth").default(false).notNull(),
  autoSync: boolean("autoSync").default(true).notNull(),
  offlineMode: boolean("offlineMode").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type AppPreference = typeof appPreferences.$inferSelect;
export type InsertAppPreference = typeof appPreferences.$inferInsert;

/**
 * App activity logs - tracks user activity on mobile app
 */
export const appActivityLogs = mysqlTable("appActivityLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  deviceId: varchar("deviceId", { length: 255 }).notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  screen: varchar("screen", { length: 255 }),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AppActivityLog = typeof appActivityLogs.$inferSelect;
export type InsertAppActivityLog = typeof appActivityLogs.$inferInsert;
