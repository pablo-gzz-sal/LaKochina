export interface Contact {
    name: string;
    email: string;
    message: string;
}

export interface QuoteRequest {
    name: string;
    email: string;
    phone: string;
    eventType: string;
    eventDate: string;
    guestCount: number;
    eventLocation: string;
    message: string;
}