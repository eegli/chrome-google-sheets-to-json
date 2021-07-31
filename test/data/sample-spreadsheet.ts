import * as GST from 'google-spreadsheets-ts';

const json: GST.RootObject = {
  version: '1.0',
  encoding: 'UTF-8',
  feed: {
    xmlns: 'http://www.w3.org/2005/Atom',
    xmlns$openSearch: 'http://a9.com/-/spec/opensearchrss/1.0/',
    xmlns$gsx: 'http://schemas.google.com/spreadsheets/2006/extended',
    id: {
      $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full'
    },
    updated: { $t: '2021-07-31T12:20:22.203Z' },
    category: [
      {
        scheme: 'http://schemas.google.com/spreadsheets/2006',
        term: 'http://schemas.google.com/spreadsheets/2006#list'
      }
    ],
    title: { type: 'text', $t: 'Test Simple' },
    link: [
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: 'https://docs.google.com/spreadsheets/u/0/d/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/pubhtml'
      },
      {
        rel: 'http://schemas.google.com/g/2005#feed',
        type: 'application/atom+xml',
        href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full'
      },
      {
        rel: 'http://schemas.google.com/g/2005#post',
        type: 'application/atom+xml',
        href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full'
      },
      {
        rel: 'self',
        type: 'application/atom+xml',
        href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full?alt\u003djson'
      }
    ],
    author: [
      { name: { $t: 'epicericegli' }, email: { $t: 'epicericegli@gmail.com' } }
    ],
    openSearch$totalResults: { $t: '9' },
    openSearch$startIndex: { $t: '1' },
    entry: [
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cokwr'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Tinu' },
        content: { type: 'text', $t: 'lastname: Elejogun, age: 14' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cokwr'
          }
        ],
        gsx$firstname: { $t: 'Tinu' },
        gsx$lastname: { $t: 'Elejogun' },
        gsx$age: { $t: '14' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cpzh4'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Javier' },
        content: { type: 'text', $t: 'lastname: Zapata, age: 28' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cpzh4'
          }
        ],
        gsx$firstname: { $t: 'Javier' },
        gsx$lastname: { $t: 'Zapata' },
        gsx$age: { $t: '28' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cre1l'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Lily' },
        content: { type: 'text', $t: 'lastname: McGarrett, age: 18' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cre1l'
          }
        ],
        gsx$firstname: { $t: 'Lily' },
        gsx$lastname: { $t: 'McGarrett' },
        gsx$age: { $t: '18' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/chk2m'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Olatunkbo' },
        content: { type: 'text', $t: 'lastname: Chijiaku, age: 22' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/chk2m'
          }
        ],
        gsx$firstname: { $t: 'Olatunkbo' },
        gsx$lastname: { $t: 'Chijiaku' },
        gsx$age: { $t: '22' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/ciyn3'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Adrienne' },
        content: { type: 'text', $t: 'lastname: Anthoula, age: 22' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/ciyn3'
          }
        ],
        gsx$firstname: { $t: 'Adrienne' },
        gsx$lastname: { $t: 'Anthoula' },
        gsx$age: { $t: '22' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/ckd7g'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Axelia' },
        content: { type: 'text', $t: 'lastname: Athanasios, age: 22' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/ckd7g'
          }
        ],
        gsx$firstname: { $t: 'Axelia' },
        gsx$lastname: { $t: 'Athanasios' },
        gsx$age: { $t: '22' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/clrrx'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Jon-Kabat' },
        content: { type: 'text', $t: 'lastname: Zinn, age: 22' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/clrrx'
          }
        ],
        gsx$firstname: { $t: 'Jon-Kabat' },
        gsx$lastname: { $t: 'Zinn' },
        gsx$age: { $t: '22' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cyevm'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Thabang' },
        content: { type: 'text', $t: 'lastname: Mosoa, age: 15' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cyevm'
          }
        ],
        gsx$firstname: { $t: 'Thabang' },
        gsx$lastname: { $t: 'Mosoa' },
        gsx$age: { $t: '15' }
      },
      {
        id: {
          $t: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cztg3'
        },
        updated: { $t: '2021-07-31T12:20:22.203Z' },
        category: [
          {
            scheme: 'http://schemas.google.com/spreadsheets/2006',
            term: 'http://schemas.google.com/spreadsheets/2006#list'
          }
        ],
        title: { type: 'text', $t: 'Kgaogelo' },
        content: { type: 'text', $t: 'lastname: Mosoa, age: 11' },
        link: [
          {
            rel: 'self',
            type: 'application/atom+xml',
            href: 'https://spreadsheets.google.com/feeds/list/1oa-AvdsZWaXzVbUIWRjzapVvYOZVcP2LL9qqsmOjHaM/3/public/full/cztg3'
          }
        ],
        gsx$firstname: { $t: 'Kgaogelo' },
        gsx$lastname: { $t: 'Mosoa' },
        gsx$age: { $t: '11' }
      }
    ]
  }
};

export default json;
