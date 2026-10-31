export type InquiryRequest = {
  full_name: string;
  work_email: string;
  service_interest: string;
  message: string;
  website?: string;
};

export type InquiryResponse = {
  id: string;
  status: string;
  created_at: string;
  message: string;
};

type InquiryValidationDetail = {
  loc?: Array<string | number>;
  msg?: string;
  type?: string;
  input?: string;
  ctx?: Record<string, unknown>;
};

export class InquiryApiError extends Error {
  status: number;
  details?: InquiryValidationDetail[];

  constructor(message: string, status: number, details?: InquiryValidationDetail[]) {
    super(message);
    this.name = "InquiryApiError";
    this.status = status;
    this.details = details;
  }
}

export async function submitInquiry(payload: InquiryRequest): Promise<InquiryResponse> {
  try {
    const response = await fetch(
      "/api/v1/inquiries",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json().catch(() => null);

    if (response.status === 201) {
      return (data ?? {
        id: "",
        status: "new",
        created_at: new Date().toISOString(),
        message: "Inquiry sent successfully.",
      }) as InquiryResponse;
    }

    if (response.status === 422) {
      const detailList = Array.isArray(data?.detail) ? data.detail : [];
      const validationMessage = detailList
        .map((item: InquiryValidationDetail) => item?.msg || "Validation error")
        .join(". ");

      throw new InquiryApiError(
        validationMessage || "Please review your form and try again.",
        response.status,
        detailList,
      );
    }

    const fallbackMessage =
      typeof data?.message === "string"
        ? data.message
        : "Something went wrong while sending your inquiry.";

    throw new InquiryApiError(fallbackMessage, response.status);
  } catch (error) {
    if (error instanceof InquiryApiError) {
      throw error;
    }

    throw new InquiryApiError(
      "Unable to reach the server right now. Please try again later.",
      500,
    );
  }
}
