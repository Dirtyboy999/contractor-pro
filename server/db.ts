import { eq, and, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users,
  clients,
  items,
  projects,
  bids,
  bidLineItems,
  invoices,
  invoiceLineItems,
  payments,
  paymentReminders,
  documentTemplates,
  businessSettings,
  notifications,
  notificationPreferences,
  type Client,
  type Item,
  type Project,
  type Bid,
  type BidLineItem,
  type Invoice,
  type InvoiceLineItem,
  type Payment,
  type PaymentReminder,
  type DocumentTemplate,
  type BusinessSettings,
  type Notification,
  type NotificationPreference,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ CLIENT QUERIES ============

export async function createClient(userId: number, data: Omit<typeof clients.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(clients).values({
    ...data,
    userId,
  });
  
  return result;
}

export async function getClientById(clientId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(clients)
    .where(and(eq(clients.id, clientId), eq(clients.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function listClientsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(clients)
    .where(eq(clients.userId, userId))
    .orderBy(desc(clients.createdAt));
}

export async function updateClient(clientId: number, userId: number, data: Partial<typeof clients.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(clients)
    .set(data)
    .where(and(eq(clients.id, clientId), eq(clients.userId, userId)));
}

export async function deleteClient(clientId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .delete(clients)
    .where(and(eq(clients.id, clientId), eq(clients.userId, userId)));
}

// ============ ITEM QUERIES ============

export async function createItem(userId: number, data: Omit<typeof items.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(items).values({
    ...data,
    userId,
  });
}

export async function getItemById(itemId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(items)
    .where(and(eq(items.id, itemId), eq(items.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function listItemsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(items)
    .where(eq(items.userId, userId))
    .orderBy(desc(items.createdAt));
}

export async function updateItem(itemId: number, userId: number, data: Partial<typeof items.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(items)
    .set(data)
    .where(and(eq(items.id, itemId), eq(items.userId, userId)));
}

export async function deleteItem(itemId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .delete(items)
    .where(and(eq(items.id, itemId), eq(items.userId, userId)));
}

// ============ PROJECT QUERIES ============

export async function createProject(userId: number, data: Omit<typeof projects.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(projects).values({
    ...data,
    userId,
  });
}

export async function getProjectById(projectId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function listProjectsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.createdAt));
}

export async function updateProject(projectId: number, userId: number, data: Partial<typeof projects.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(projects)
    .set(data)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));
}

// ============ BID QUERIES ============

export async function createBid(userId: number, data: Omit<typeof bids.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(bids).values({
    ...data,
    userId,
  });
}

export async function getBidById(bidId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(bids)
    .where(and(eq(bids.id, bidId), eq(bids.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function listBidsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(bids)
    .where(eq(bids.userId, userId))
    .orderBy(desc(bids.createdAt));
}

export async function listBidsByProject(projectId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(bids)
    .where(and(eq(bids.projectId, projectId), eq(bids.userId, userId)))
    .orderBy(desc(bids.createdAt));
}

export async function updateBid(bidId: number, userId: number, data: Partial<typeof bids.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(bids)
    .set(data)
    .where(and(eq(bids.id, bidId), eq(bids.userId, userId)));
}

// ============ BID LINE ITEM QUERIES ============

export async function createBidLineItem(data: Omit<typeof bidLineItems.$inferInsert, 'createdAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(bidLineItems).values(data);
}

export async function listBidLineItems(bidId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(bidLineItems)
    .where(eq(bidLineItems.bidId, bidId))
    .orderBy(asc(bidLineItems.sortOrder));
}

export async function updateBidLineItem(lineItemId: number, data: Partial<typeof bidLineItems.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(bidLineItems)
    .set(data)
    .where(eq(bidLineItems.id, lineItemId));
}

export async function deleteBidLineItem(lineItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(bidLineItems).where(eq(bidLineItems.id, lineItemId));
}

// ============ INVOICE QUERIES ============

export async function createInvoice(userId: number, data: Omit<typeof invoices.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(invoices).values({
    ...data,
    userId,
  });
}

export async function getInvoiceById(invoiceId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(invoices)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function listInvoicesByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(invoices)
    .where(eq(invoices.userId, userId))
    .orderBy(desc(invoices.createdAt));
}

export async function listInvoicesByProject(projectId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(invoices)
    .where(and(eq(invoices.projectId, projectId), eq(invoices.userId, userId)))
    .orderBy(desc(invoices.createdAt));
}

export async function updateInvoice(invoiceId: number, userId: number, data: Partial<typeof invoices.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(invoices)
    .set(data)
    .where(and(eq(invoices.id, invoiceId), eq(invoices.userId, userId)));
}

// ============ INVOICE LINE ITEM QUERIES ============

export async function createInvoiceLineItem(data: Omit<typeof invoiceLineItems.$inferInsert, 'createdAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(invoiceLineItems).values(data);
}

export async function listInvoiceLineItems(invoiceId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(invoiceLineItems)
    .where(eq(invoiceLineItems.invoiceId, invoiceId))
    .orderBy(asc(invoiceLineItems.sortOrder));
}

export async function updateInvoiceLineItem(lineItemId: number, data: Partial<typeof invoiceLineItems.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(invoiceLineItems)
    .set(data)
    .where(eq(invoiceLineItems.id, lineItemId));
}

export async function deleteInvoiceLineItem(lineItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.delete(invoiceLineItems).where(eq(invoiceLineItems.id, lineItemId));
}

// ============ PAYMENT QUERIES ============

export async function createPayment(userId: number, data: Omit<typeof payments.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(payments).values({
    ...data,
    userId,
  });
}

export async function getPaymentById(paymentId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(payments)
    .where(and(eq(payments.id, paymentId), eq(payments.userId, userId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function listPaymentsByInvoice(invoiceId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(payments)
    .where(and(eq(payments.invoiceId, invoiceId), eq(payments.userId, userId)))
    .orderBy(desc(payments.createdAt));
}

export async function listPaymentsByUser(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(payments)
    .where(eq(payments.userId, userId))
    .orderBy(desc(payments.createdAt));
}

export async function updatePayment(paymentId: number, userId: number, data: Partial<typeof payments.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(payments)
    .set(data)
    .where(and(eq(payments.id, paymentId), eq(payments.userId, userId)));
}

// ============ BUSINESS SETTINGS QUERIES ============

export async function getBusinessSettings(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(businessSettings)
    .where(eq(businessSettings.userId, userId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdateBusinessSettings(userId: number, data: Omit<typeof businessSettings.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getBusinessSettings(userId);
  
  if (existing) {
    return db
      .update(businessSettings)
      .set(data)
      .where(eq(businessSettings.userId, userId));
  } else {
    return db.insert(businessSettings).values({
      ...data,
      userId,
    });
  }
}

// ============ DOCUMENT TEMPLATE QUERIES ============

export async function createDocumentTemplate(userId: number, data: Omit<typeof documentTemplates.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(documentTemplates).values({
    ...data,
    userId,
  });
}

export async function listDocumentTemplates(userId: number, type?: 'invoice' | 'bid') {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const conditions = type 
    ? and(eq(documentTemplates.userId, userId), eq(documentTemplates.type, type))
    : eq(documentTemplates.userId, userId);
  
  return db
    .select()
    .from(documentTemplates)
    .where(conditions)
    .orderBy(desc(documentTemplates.createdAt));
}

export async function updateDocumentTemplate(templateId: number, userId: number, data: Partial<typeof documentTemplates.$inferInsert>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(documentTemplates)
    .set(data)
    .where(and(eq(documentTemplates.id, templateId), eq(documentTemplates.userId, userId)));
}

export async function deleteDocumentTemplate(templateId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .delete(documentTemplates)
    .where(and(eq(documentTemplates.id, templateId), eq(documentTemplates.userId, userId)));
}


// ============ NOTIFICATION QUERIES ============

export async function createNotification(userId: number, data: Omit<typeof notifications.$inferInsert, 'userId' | 'createdAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(notifications).values({
    ...data,
    userId,
  });
}

export async function listNotificationsByUser(userId: number, limit: number = 50) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function getUnreadNotificationCount(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(notifications)
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
  
  return result.length;
}

export async function markNotificationAsRead(notificationId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(notifications)
    .set({ isRead: true, readAt: new Date() })
    .where(and(eq(notifications.id, notificationId), eq(notifications.userId, userId)));
}

export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .update(notifications)
    .set({ isRead: true, readAt: new Date() })
    .where(eq(notifications.userId, userId));
}

export async function deleteNotification(notificationId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db
    .delete(notifications)
    .where(and(eq(notifications.id, notificationId), eq(notifications.userId, userId)));
}

// ============ NOTIFICATION PREFERENCE QUERIES ============

export async function getNotificationPreferences(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, userId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdateNotificationPreferences(userId: number, data: Omit<typeof notificationPreferences.$inferInsert, 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getNotificationPreferences(userId);
  
  if (existing) {
    return db
      .update(notificationPreferences)
      .set(data)
      .where(eq(notificationPreferences.userId, userId));
  } else {
    return db.insert(notificationPreferences).values({
      ...data,
      userId,
    });
  }
}


// ============ RESELLER FUNCTIONS ============

export async function createReseller(userId: number, input: {
  companyName: string;
  domain?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tier: "starter" | "pro" | "enterprise";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { resellers } = await import("../drizzle/schema");
  return db.insert(resellers).values({
    userId,
    ...input,
    status: "pending",
  });
}

export async function getResellerByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const { resellers } = await import("../drizzle/schema");
  const result = await db.select().from(resellers).where(
    eq(resellers.userId, userId)
  ).limit(1);
  return result[0] || null;
}

export async function updateResellerStatus(resellerId: number, status: "pending" | "active" | "suspended" | "inactive") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { resellers } = await import("../drizzle/schema");
  return db.update(resellers).set({ status }).where(
    eq(resellers.id, resellerId)
  );
}

// ============ SCHEDULING FUNCTIONS ============

export async function createSchedule(userId: number, input: {
  projectId: number;
  startDate: Date;
  endDate: Date;
  estimatedHours?: number;
  notes?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { schedules } = await import("../drizzle/schema");
  return db.insert(schedules).values({
    userId,
    ...input,
    status: "scheduled",
  });
}

export async function assignCrewToSchedule(scheduleId: number, employeeId: number, role?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { crewAssignments } = await import("../drizzle/schema");
  return db.insert(crewAssignments).values({
    scheduleId,
    employeeId,
    role,
    status: "pending",
  });
}

export async function getSchedulesByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const { schedules } = await import("../drizzle/schema");
  return db.select().from(schedules).where(
    eq(schedules.userId, userId)
  );
}

export async function getCrewAssignmentsBySchedule(scheduleId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const { crewAssignments } = await import("../drizzle/schema");
  return db.select().from(crewAssignments).where(
    eq(crewAssignments.scheduleId, scheduleId)
  );
}

export async function createCalendarIntegration(userId: number, input: {
  provider: "google" | "outlook" | "ical";
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  calendarId?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { calendarIntegrations } = await import("../drizzle/schema");
  return db.insert(calendarIntegrations).values({
    userId,
    ...input,
    syncEnabled: true,
  });
}

export async function getCalendarIntegrationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const { calendarIntegrations } = await import("../drizzle/schema");
  return db.select().from(calendarIntegrations).where(
    eq(calendarIntegrations.userId, userId)
  );
}

// ============ MOBILE APP FUNCTIONS ============

export async function registerMobileDevice(userId: number, input: {
  deviceId: string;
  platform: "ios" | "android" | "web";
  osVersion?: string;
  appVersion?: string;
  pushToken?: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { mobileDevices } = await import("../drizzle/schema");
  return db.insert(mobileDevices).values({
    userId,
    ...input,
    isActive: true,
  });
}

export async function getMobileDevicesByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const { mobileDevices } = await import("../drizzle/schema");
  return db.select().from(mobileDevices).where(
    eq(mobileDevices.userId, userId)
  );
}

export async function addOfflineSyncItem(userId: number, deviceId: string, input: {
  action: "create" | "update" | "delete";
  entityType: string;
  entityId: number;
  data?: any;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { offlineSyncQueue } = await import("../drizzle/schema");
  return db.insert(offlineSyncQueue).values({
    userId,
    deviceId,
    ...input,
    synced: false,
  });
}

export async function getOfflineSyncQueue(userId: number, deviceId: string) {
  const db = await getDb();
  if (!db) return [];
  
  const { offlineSyncQueue } = await import("../drizzle/schema");
  return db.select().from(offlineSyncQueue).where(
    and(eq(offlineSyncQueue.userId, userId), eq(offlineSyncQueue.deviceId, deviceId), eq(offlineSyncQueue.synced, false))
  );
}

export async function markSyncItemAsProcessed(syncItemId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { offlineSyncQueue } = await import("../drizzle/schema");
  return db.update(offlineSyncQueue).set({
    synced: true,
    syncedAt: new Date(),
  }).where(eq(offlineSyncQueue.id, syncItemId));
}

export async function getOrCreateAppPreferences(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { appPreferences } = await import("../drizzle/schema");
  
  const existing = await db.select().from(appPreferences).where(
    eq(appPreferences.userId, userId)
  ).limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }
  
  await db.insert(appPreferences).values({
    userId,
    theme: "auto",
    notifications: true,
    biometricAuth: false,
    autoSync: true,
    offlineMode: true,
  });
  
  const result = await db.select().from(appPreferences).where(
    eq(appPreferences.userId, userId)
  ).limit(1);
  
  return result[0];
}

export async function updateAppPreferences(userId: number, input: Partial<{
  theme: "light" | "dark" | "auto";
  notifications: boolean;
  biometricAuth: boolean;
  autoSync: boolean;
  offlineMode: boolean;
}>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { appPreferences } = await import("../drizzle/schema");
  return db.update(appPreferences).set(input).where(
    eq(appPreferences.userId, userId)
  );
}

export async function logAppActivity(userId: number, deviceId: string, input: {
  action: string;
  screen?: string;
  metadata?: any;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const { appActivityLogs } = await import("../drizzle/schema");
  return db.insert(appActivityLogs).values({
    userId,
    deviceId,
    ...input,
  });
}
