import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/DashboardLayout";

export default function TermsOfService() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mt-2">Last Updated: January 20, 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>By accessing or using the Service, you agree to be bound by these Terms and all policies incorporated by reference. If you do not agree to all of these Terms, do not use our Service.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Eligibility</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>You must be at least 18 years old to use the Service. By agreeing to these Terms, you represent and warrant that you are of legal age and have the capacity to enter into a binding agreement.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>You are responsible for all activities that occur under your account. You agree not to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Interfere with the security or integrity of the Service</li>
              <li>Upload or transmit any viruses or other malicious code</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>The Service, including all software, code, graphics, logos, and content, is the property of Contractor Pro and is protected by intellectual property laws.</p>
            <p>You retain all ownership rights to the data you upload or create using the Service.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Payment and Billing</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Access to certain features of the Service may require a paid subscription. You agree to pay all applicable fees as described on the Service.</p>
            <p>We use a third-party payment processor (Stripe) to bill you through a payment account linked to your subscription.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Termination</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Disclaimers and Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.</p>
            <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CONTRACTOR PRO BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>If you have any questions about these Terms, please contact us at support@contractorpro.com</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
