enum ListType {
  buy  = 'buy',
  sell = 'sell',
  all  = 'all'
};

enum BookListingLabelText {
  buy  = 'Wanted',
  sell = 'For Sale',
  mine = 'Your Listing'
};

enum BookListingLabelColor {
  buy  = '#337ab7',
  sell = '#f0ad4e',
  mine = '#444C4E'
};

interface Book {
  id:         number;
  user_id:    number;
  school_id:  number;
  name:       string;
  isbn10:     string;
  isbn13:     string;
  price:      number;
  list_type:  ListType;
  image:      string;
  new_image?: string;
};

interface BooksFilter {
  name:     string;
  listType: ListType;
  isbn10:   string;
  isbn13:   string;
  minPrice: number;
  maxPrice: number;
}

