/**
 * Abstract Payment Provider Interface
 * 
 * This file serves as the blueprint for integrating the selected payment provider
 * (e.g., Stripe, Payme, Click) once API credentials are provided via environment variables.
 */

export interface CheckoutSessionOptions {
  userId: string;
  organizationId: string;
  planId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentProvider {
  /**
   * Initializes a secure checkout session and returns the redirect URL.
   */
  createCheckoutSession(options: CheckoutSessionOptions): Promise<{ url: string; id: string }>;
  
  /**
   * Validates and handles incoming webhooks to update subscription status.
   */
  handleWebhook(rawBody: string, signature: string): Promise<boolean>;
}

// ============================================================================
// PENDING IMPLEMENTATION
// ============================================================================

class PendingPaymentProvider implements PaymentProvider {
  async createCheckoutSession(options: CheckoutSessionOptions) {
    console.warn("Payment provider is pending configuration. Returning mock success URL.");
    // In production, this would communicate with the provider API.
    return {
      url: `${options.successUrl}?session_id=pending_integration`,
      id: "pending_integration"
    };
  }

  async handleWebhook(_rawBody: string, _signature: string): Promise<boolean> {
    throw new Error("Webhook handling requires active provider integration.");
  }
}

export const paymentProvider = new PendingPaymentProvider();
