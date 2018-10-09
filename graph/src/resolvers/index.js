// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const companies = {
  '1a43b7887e3bf72f5b306f8eba2af5e6': {
    name: 'EMP',
    hash: '1a43b7887e3bf72f5b306f8eba2af5e6',
    address1: '2701 North 30th Street',
    address2: null,
    city: 'Escanaba',
    state: 'MI',
    zip: '49829',
    country: 'US',
    phone: '906.789.7497',
    tollfree: null,
    fax: null,
    website: 'http://www.emp-corp.com',
    type: 'Supplier',
    email: 'Kevin.Puszczewicz@emp-corp.com',
    body: 'EMP is the innovation leader in reducing emissions and improving fuel economy and safety, and enabling cost-effective retrofit of mass transit fleets utilizing EMP\'s Mini-Hybrid thermal management system.',
    primaryImage: 'https://r3.masstransitmag.com/files/base/image/MASS/2013/10/3x2/300x200/minihybridstickerhr-page-0_11186267.png',
    contacts: [
      {
        hash: '016e5251787c22a3b4c3a075a0eeb82f',
        firstName: 'Kevin',
        lastName: 'Puszczewicz',
        title: 'Director of Sales and Customer Service',
        address1: '2701 North 30th Street',
        address2: null,
        city: null,
        state: null,
        zip: null,
        country: null,
        phone: null,
        mobile: null,
        fax: null,
        email: 'Kevin.Puszczewicz@emp-corp.com',
        emailPublic: 'Kevin.Puszczewicz@emp-corp.com',
        website: null,
        shortTeaser: null,
        teaser: null,
        body: null,
      },
    ],
    products: [],
    sections: [
      {
        name: 'Bus',
        id: 1234,
        children: [
          {
            name: 'Bus Components, Accessories',
            id: 12345,
          },
          {
            name: 'Bus Builders, Rebuilders, Distributors',
            id: 123456,
          },
        ],
      },
      {
        name: 'Maintenance',
        id: 123,
        children: [],
      },
    ],
    images: [
      {
        src: 'https://r3.masstransitmag.com/files/base/image/MASS/2013/10/3x2/300x200/minihybridstickerhr-page-0_11186267.png',
      },
    ],
  },
};

module.exports = {
  Query: {
    company: (_, { hash }) => {
      if (Object.prototype.hasOwnProperty.call(companies, hash)) return companies[hash];
      throw new Error('No company was found using the supplied hash.');
    },
  },
};
