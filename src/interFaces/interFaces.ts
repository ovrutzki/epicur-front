export interface ICard {
  id?: number;
  name: string | undefined;
  price?: number;
  icons?: string[];
  img?: string;
  about?: string;
  chef?: string;
  rating?: string;
  class?: string;
  navigatePath?:string;
  onClick?:any;
}
export interface IChefCard {
  _id?:any;
  id?:number;
  img?: string;
  name?: string;
  navigatePath?:string;
  about?:string;
  restaurants?:number[];
  onClick?:any;
  age?:number
}

export interface IPopular {
  kind: ICard[];
}

export interface IButtons {
  refProps?: any;
  name: string;
  value?: string;
  filter?: string;
  setFilter?: any;
  min?:number;
  max?:number;
  onClick?:any;
}

export interface IRenderRest {
  sortFilter: string;
}

export interface IModal{
  id?:number;
  open?:boolean;
  onClose?:any;
  restaurantId?:number | undefined;
  refProps?:any;
  btnRefProps?:any;
  restaurantName?:string;
}

