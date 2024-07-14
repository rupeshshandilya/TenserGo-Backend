export class CreateFeedbackDto {
    readonly userId: string;
    readonly category: 'Product Features' | 'Product Pricing' | 'Product Usability';
    readonly comments: string;
  }
  
  export class QueryFeedbackDto {
    readonly category: 'Product Features' | 'Product Pricing' | 'Product Usability';
  }
  
  export class UpdateFeedbackDto {
    readonly category?: string;
    readonly rating?: number;
    readonly comments?: string;
  }
  