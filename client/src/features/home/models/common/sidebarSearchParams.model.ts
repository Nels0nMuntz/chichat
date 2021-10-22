import { ISearchParams, SearchGroups } from "shared";

export interface ISidebarSearchParams extends ISearchParams { 
    group: SearchGroups;
    internal?: boolean;
};