import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function PrivacyPolicy() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mt-2">Last Updated: January 20, 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Account Information</h3>
              <p className="text-sm text-muted-foreground">
                When you create an account, we collect your name, email address, and authentication credentials.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Business Data</h3>
              <p className="text-sm text-muted-foreground">
                Information related to your business operations, including client names, contact details, project details, estimates, invoices, and payment records.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Information</h3>
              <p className="text-sm text-muted-foreground">
                We do not store full payment card details. Payment processing is handled by Stripe. We collect and store a tokenized version of your payment information.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>We use the information we collect to provide, maintain, and improve the Service, including processing transactions, managing your business data, and facilitating communication.</p>
            <p>We also use it for personalization, security, and compliance purposes.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Sharing of Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>We may share your information with third-party service providers such as Stripe for payment processing, AI providers for insights, and analytics providers.</p>
            <p>We may also share information in connection with business transfers or legal compliance.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>We implement reasonable security measures designed to protect your information from unauthorized access, disclosure, alteration, and destruction.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>If you have any questions about this Privacy Policy, please contact us at support@contractorpro.com</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
