export interface User{
    id:string,
    name:string,
    age:string
    gender:string,
    location:string,
    friendsList:string[],
    isParent?:boolean
}

export interface ChartData {
    name: string;
    id: string;
    children: ChartData[]
  }

  export interface Encode {
    value: number[];
  }
  
  export interface TreeAncestor {
    name: string;
    dataIndex: number;
  }
  
  export interface Formatter {
    componentType: string;
    componentSubType: string;
    componentIndex: number;
    seriesType: string;
    seriesIndex: number;
    seriesId: string;
    seriesName: string;
    name: string;
    dataIndex: number;
    data: ChartData;
    color: string;
    encode: Encode;
    $vars: string[];
    treeAncestors: TreeAncestor[];
    collapsed: boolean;
    status: string;
    value: string;
  }
