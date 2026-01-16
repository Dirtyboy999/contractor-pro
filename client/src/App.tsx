import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Items from "./pages/Items";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import InvoiceCreate from "./pages/InvoiceCreate";
import Bids from "./pages/Bids";
import BidDetail from "./pages/BidDetail";
import BidCreate from "./pages/BidCreate";
import Payments from "./pages/Payments";
import PaymentCreate from "./pages/PaymentCreate";
import ClientPortal from "./pages/ClientPortal";
import ProjectPhotos from "./pages/ProjectPhotos";
import RecurringInvoices from "./pages/RecurringInvoices";
import PaymentCheckout from "./pages/PaymentCheckout";
import FinancialReports from "./pages/FinancialReports";
import ExpenseTracking from "./pages/ExpenseTracking";
import TimeTracking from "./pages/TimeTracking";
import Messages from "./pages/Messages";
import TeamManagement from "./pages/TeamManagement";
import DashboardCustom from "./pages/DashboardCustom";
import AIInsights from "./pages/AIInsights";
import BulkActions from "./pages/BulkActions";
import ProjectScheduling from "./pages/ProjectScheduling";
import CompetitiveAdvantage from "./pages/CompetitiveAdvantage";
import EmployeeTracking from "./pages/EmployeeTracking";
import Payroll from "./pages/Payroll";
import JobCosting from "./pages/JobCosting";
import Pricing from "./pages/Pricing";
import Referrals from "./pages/Referrals";
import FinancingSettings from "./pages/FinancingSettings";
import CustomerFinancing from "./pages/CustomerFinancing";
import LandingPage from "./pages/LandingPage";
import SMSNotifications from "./pages/SMSNotifications";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import Onboarding from "./pages/Onboarding";
import IntegrationMarketplace from "./pages/IntegrationMarketplace";
import Testimonials from "./pages/Testimonials";
import HelpCenter from "./pages/HelpCenter";
import AffiliateProgram from "./pages/AffiliateProgram";
import LiveChat from "./pages/LiveChat";
import CommunityForum from "./pages/CommunityForum";
import AdvancedFeatures from "./pages/AdvancedFeatures";
import CuttingEdgeFeatures from "./pages/CuttingEdgeFeatures";
import CompetitiveIntelligence from "./pages/CompetitiveIntelligence";
import Settings from "./pages/Settings";
import NotificationCenter from "./pages/NotificationCenter";
import NotificationSettings from "./pages/NotificationSettings";
import WhiteLabelReseller from "./pages/WhiteLabelReseller";
import AdvancedScheduling from "./pages/AdvancedScheduling";
import MobileApp from "./pages/MobileApp";
import { useAuth } from "./_core/hooks/useAuth";

function Router() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path={"/onboarding"} component={Onboarding} />
        <Route path={"/landing"} component={LandingPage} />
        <Route path={"/"} component={Home} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <DashboardLayout>
      <Switch>
        <Route path={"/"} component={Dashboard} />
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/clients"} component={Clients} />
        <Route path={"/clients/:id"} component={ClientDetail} />
        <Route path={"/items"} component={Items} />
        <Route path={"/projects"} component={Projects} />
        <Route path={"/projects/:id"} component={ProjectDetail} />
        <Route path={"/invoices"} component={Invoices} />
        <Route path={"/invoices/create"} component={InvoiceCreate} />
        <Route path={"/invoices/:id"} component={InvoiceDetail} />
        <Route path={"/bids"} component={Bids} />
        <Route path={"/bids/create"} component={BidCreate} />
        <Route path={"/bids/:id"} component={BidDetail} />
        <Route path={"/payments"} component={Payments} />
        <Route path={"/payments/create"} component={PaymentCreate} />
        <Route path={"/settings"} component={Settings} />
        <Route path={"/notifications"} component={NotificationCenter} />
        <Route path={"/notification-settings"} component={NotificationSettings} />
        <Route path={"/portal/:token"} component={ClientPortal} />
        <Route path={"/projects/:id/photos"} component={ProjectPhotos} />
        <Route path={"/recurring-invoices"} component={RecurringInvoices} />
        <Route path={"/payment-checkout"} component={PaymentCheckout} />
        <Route path={"/financial-reports"} component={FinancialReports} />
        <Route path={"/expenses"} component={ExpenseTracking} />
        <Route path={"/time-tracking"} component={TimeTracking} />
        <Route path={"/messages"} component={Messages} />
        <Route path={"/team"} component={TeamManagement} />
        <Route path={"/dashboard-custom"} component={DashboardCustom} />
        <Route path={"/ai-insights"} component={AIInsights} />
        <Route path={"/bulk-actions"} component={BulkActions} />
        <Route path={"/project-scheduling"} component={ProjectScheduling} />
        <Route path={"/competitive-advantage"} component={CompetitiveAdvantage} />
        <Route path={"/employee-tracking"} component={EmployeeTracking} />
        <Route path={"/payroll"} component={Payroll} />
        <Route path={"/job-costing"} component={JobCosting} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/referrals"} component={Referrals} />
        <Route path={"/financing-settings"} component={FinancingSettings} />
        <Route path={"/customer-financing"} component={CustomerFinancing} />
        <Route path={"/sms-notifications"} component={SMSNotifications} />
        <Route path={"/analytics"} component={AnalyticsDashboard} />
       <Route path="/integration-marketplace" component={IntegrationMarketplace} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/affiliate-program" component={AffiliateProgram} />
      <Route path="/live-chat" component={LiveChat} />
      <Route path="/community-forum" component={CommunityForum} />
      <Route path="/advanced-features" component={AdvancedFeatures} />
      <Route path="/cutting-edge-features" component={CuttingEdgeFeatures} />
      <Route path="/competitive-intelligence" component={CompetitiveIntelligence} />
      <Route path="/white-label-reseller" component={WhiteLabelReseller} />
      <Route path="/advanced-scheduling" component={AdvancedScheduling} />
      <Route path="/mobile-app" component={MobileApp} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
