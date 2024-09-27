document.querySelectorAll('header ul li a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('chk1').checked = false;
  });
});

//arts
const ARTS_API_URL = 'topstories_arts.json'; //https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=nDxfsOEmrg52Bru3o9MXHqt6u9YShWgK

const artscover = document.querySelector('.top-arts');

const getToparts = async () => {
  try {
    const res = await fetch(ARTS_API_URL);
    const arts = await res.json();
    return arts;
  } catch (e) {
    alert('An error occurred', e);
    return [];
  }
};

const updateContainerarts = (arts) => {
  artscover.innerHTML = '';
  
  (arts.results || []).forEach((arts_data) => {
    const newsContainerarts = document.createElement('li');
    newsContainerarts.setAttribute('class', 'article');

    const imageUrl = (arts_data.multimedia && arts_data.multimedia.length > 0)
      ? arts_data.multimedia[0].url
      : 'default-image-url.jpg';

    newsContainerarts.innerHTML = `
      <h2>${arts_data.title}</h2>
      <img src="${imageUrl}" alt="${arts_data.title}"/>
      <p>Author: ${arts_data.byline || 'Unknown'}</p>
      <p>Description: ${arts_data.abstract || 'No description available'}</p>
      <a href="${arts_data.url}" target="_blank">About more</a>
    `;

    artscover.appendChild(newsContainerarts);
  });
};

(async () => {
  const ud_dataarts = await getToparts();
  console.log(ud_dataarts);

  updateContainerarts(ud_dataarts);
})();


//books
const BOOKS_API_URL = 'books.json';
//https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=nDxfsOEmrg52Bru3o9MXHqt6u9YShWgK

const HardCoverFiction = document.querySelector('.hard-cover-books');

const getTopBooks = async () => {
  try {
    const res = await fetch(BOOKS_API_URL);
    const book = await res.json();
    return book;
  } catch (e) {
    alert('An error occurred', e);
    return [];
  }
};

const updateContainerbook = (book) => {
  HardCoverFiction.innerHTML = '';
  
  (book.results?.books || []).forEach((book_data) => {
    const newsContainerbook = document.createElement('li');
    newsContainerbook.setAttribute('class', 'article');


    newsContainerbook.innerHTML = `
      <h2>${book_data.rank}</h2>
      <h2>${book_data.title}</h2>
      <img src="${book_data.book_image}">
      <p>Author: ${book_data.author}</p>
      <p>Publisher: ${book_data.publisher}</p>
      <p>Description: ${book_data.description}</p>
      <a href="${
        book_data.amazon_product_url
                }" target="_blank">About more</a>
    `;

    HardCoverFiction.appendChild(newsContainerbook);
  });
};

(async () => {
  const ud_data = await getTopBooks();
  console.log(ud_data);

  updateContainerbook(ud_data);
})();

// home

const API_URL = 'topstories_home.json'; //https://api.nytimes.com/svc/topstories/v2/home.json?api-key=nDxfsOEmrg52Bru3o9MXHqt6u9YShWgK
const swiperWrapper = document.querySelector('.swiper-wrapper');


const getTopNews = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  } catch (e) {
    alert('An error occurred', e);
    return [];
  }
};


const updateSwiper = (data) => {
  swiperWrapper.innerHTML = '';
  (data.results || []).forEach((news) => {
    const swiperSlide = document.createElement('li');
    swiperSlide.setAttribute('class', 'card-item swiper-slide');

    const imageUrl = (news.multimedia && news.multimedia.length > 0)
      ? news.multimedia[0].url
      : 'default-image-url.jpg';

    swiperSlide.innerHTML = 
      `<a href="${news.url}" class="card-link" target="_blank">
        <img src="${imageUrl}" alt="${news.title}" class="card-image" />
        <p class="badge">${news?.section}</p>
        <h1 class="card-title">${news?.title}</h1>
        <p class="data">${news?.byline}</p>
        <p class="data">Published: ${news?.published_date}</p>
        
        <button class="card-button fa-solid fa-arrow-right"></button>
      </a>`
    ;

    swiperWrapper.appendChild(swiperSlide);
  });
};




(async () => {
  const data = await getTopNews();
  updateSwiper(data);


  new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 30,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      },
    }
  });
})();




