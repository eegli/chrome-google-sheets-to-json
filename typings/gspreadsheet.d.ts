/* http://json2ts.com/ with custom changes */

declare module 'google-spreadsheets-ts' {
  export interface Id {
    $t: string;
  }

  export interface Updated {
    $t: string;
  }

  export interface Category {
    scheme: string;
    term: string;
  }

  export interface Title {
    type: string;
    $t: string;
  }

  export interface Link {
    rel: string;
    type: string;
    href: string;
  }

  export interface Name {
    $t: string;
  }

  export interface Email {
    $t: string;
  }

  export interface Author {
    name: Name;
    email: Email;
  }

  export interface OpenSearchTotalResults {
    $t: string;
  }

  export interface OpenSearchStartIndex {
    $t: string;
  }

  export interface Content {
    type: string;
    $t: string;
  }

  export interface GsxCpzh4 {
    $t: string;
  }

  export interface Entry {
    id: Id2;
    updated: Updated;
    category: Category[];
    title: Title;
    content: Content;
    link: Link[];
    gsx$_cpzh4?: GsxCpzh4;
    [key: string]: any;
  }

  export interface Feed {
    xmlns: string;
    xmlns$openSearch: string;
    xmlns$gsx: string;
    id: Id;
    updated: Updated;
    category: Category[];
    title: Title;
    link: Link[];
    author: Author[];
    openSearch$totalResults: OpenSearchTotalResults;
    openSearch$startIndex: OpenSearchStartIndex;
    entry?: Entry[];
  }

  export interface RootObject {
    version: string;
    encoding: string;
    feed: Feed;
  }
}
