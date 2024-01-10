export interface CreateCategoryData {
    name: string;
  }
  
  export interface CategoryData extends CreateCategoryData {
    id: string;
    is_active: boolean;
  }