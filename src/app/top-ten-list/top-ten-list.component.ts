import { Component, OnInit, ElementRef } from '@angular/core';

interface TopTenItem {
  title: string;
  description: string;
  link: string;
  amazonLink?: string;
  lazadaLink?: string;
}

interface TopTenList {
  title: string;
  items: TopTenItem[];
}

@Component({
  selector: 'app-top-ten-list',
  templateUrl: './top-ten-list.component.html',
  styleUrls: ['./top-ten-list.component.scss'],
})
export class TopTenListComponent implements OnInit {
  topTenLists: TopTenList[] = [
    {
      title: 'Top 10 Best Laptops for Remote Work in 2023',
      items: [
        {
          title: 'Dell XPS 13',
          description:
            'The Dell XPS 13 combines a sleek design, powerful performance, and a stunning display, making it a top choice for remote work.',
          link: '',
          amazonLink: 'https://amzn.to/3lTGg5n',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVFYb',
        },
        {
          title: 'Apple MacBook Air (M1)',
          description:
            "The MacBook Air with Apple's M1 chip offers exceptional battery life and performance, perfect for professionals working from home.",
          link: '',
          amazonLink: 'https://amzn.to/3lWNWDI',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJevuS',
        },
        {
          title: 'Lenovo ThinkPad X1 Carbon',
          description:
            'The ThinkPad X1 Carbon provides a reliable and durable option for remote workers, with a fantastic keyboard and impressive battery life.',
          link: '',
          amazonLink: 'https://amzn.to/3TZBuzK',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVxdy',
        },
        {
          title: 'HP Spectre x360',
          description:
            'The HP Spectre x360 is a versatile 2-in-1 laptop with a sleek design, powerful performance, and excellent battery life.',
          link: '',
          amazonLink: 'https://amzn.to/3ManIs1',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVxW2',
        },
        {
          title: 'Microsoft Surface Laptop 4',
          description:
            'The Surface Laptop 4 offers a stylish design, vibrant display, and solid performance, making it a great choice for remote work.',
          link: '',
          amazonLink: 'https://amzn.to/3JVYzys',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJevuS',
        },
        {
          title: 'Asus ZenBook 13',
          description:
            'The Asus ZenBook 13 is a compact and lightweight laptop with strong performance, a comfortable keyboard, and impressive battery life.',
          link: '',
          amazonLink: 'https://amzn.to/3K6HjXq',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVFY8',
        },
        {
          title: 'Acer Swift 5',
          description:
            'The Acer Swift 5 is an ultra-thin and lightweight laptop with a vivid display and long battery life, ideal for working on the go.',
          link: '',
          amazonLink: 'https://amzn.to/3m5OEyr',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVELB',
        },
        {
          title: 'LG Gram 14',
          description:
            'The LG Gram 14 offers an incredibly lightweight design and all-day battery life, making it perfect for professionals who value portability.',
          link: '',
          amazonLink: 'https://amzn.to/3K6l7Ni',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJevuS',
        },
        {
          title: 'Razer Book 13',
          description:
            'The Razer Book 13 is a premium ultrabook with a stunning display, solid performance, and a sleek design that appeals to remote workers.',
          link: '',
          amazonLink: 'https://amzn.to/42WkjDg',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVxHU',
        },
        {
          title: 'Google Pixelbook Go',
          description:
            'The Pixelbook Go is a Chromebook with a minimalist design, excellent battery life, and smooth performance, suitable for remote work tasks.',
          link: '',
          amazonLink: 'https://amzn.to/40BcfX1',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVxWC',
        },
      ],
    },
    {
      title: 'Top 10 E-Wallets in the Philippines',
      items: [
        {
          title: 'GCash',
          description:
            'A popular mobile wallet app that allows users to send money, pay bills, and shop online.',
          // link: 'https://www.gcash.com/',
          link: 'https://gcsh.app/r/hlEe7bL',
        },
        {
          title: 'Maya',
          description:
            'A digital wallet that offers a convenient way to pay bills, shop online, and send money with just a few taps on your smartphone.',
          // link: 'https://www.paymaya.com/',
          link: 'https://www.maya.ph/app/registration?invite=LE8G1ZX243VQ',
        },
        {
          title: 'Coins.ph',
          description:
            'A mobile wallet that provides an easy way to buy and sell cryptocurrencies, pay bills, and send money.',
          link: 'https://coins.ph/',
        },
        {
          title: 'GrabPay',
          description:
            'A digital wallet by Grab that allows you to pay for Grab services and make purchases at partner merchants.',
          // link: 'https://www.grab.com/ph/pay/',
          link: 'https://r.grab.com/r/jshu32qa',
        },
        {
          title: 'UnionBank Online',
          description:
            'UnionBank of the Philippines offers a digital banking platform that includes a mobile wallet for easy money transfers and bill payments.',
          link: 'https://www.unionbankph.com/personal/digital-banking/online',
        },
        {
          title: 'BDO Pay',
          description:
            'A mobile wallet by BDO Unibank that offers convenient cashless transactions, bill payments, and QR code payments.',
          link: 'https://www.bdo.com.ph/bdopay',
        },
        {
          title: 'LandBank Mobile Banking',
          description:
            'The mobile banking app of LandBank of the Philippines that offers a digital wallet for quick money transfers and transactions.',
          link: 'https://www.landbank.com/mobile-banking',
        },
        {
          title: 'BPI Mobile Wallet',
          description:
            'Bank of the Philippine Islands offers a mobile wallet as part of its mobile banking app, allowing for easy money transfers, bill payments, and account management.',
          link: 'https://www.bpi.com.ph/mobile-banking',
        },
        {
          title: 'Metrobank Mobile Banking',
          description:
            "Metrobank's mobile app offers a digital wallet feature for convenient money transfers, bill payments, and account management.",
          link: 'https://www.metrobank.com.ph/mobile_banking.asp',
        },
        {
          title: 'Security Bank Mobile App',
          description:
            'Security Bank offers a mobile wallet as part of its mobile banking app, allowing users to easily transfer money, pay bills, and manage their accounts.',
          link: 'https://www.securitybank.com/personal/digital-banking/mobile-app/',
        },
      ],
    },

    {
      title:
        'Top 10 Budget-Friendly Laptops for an Efficient Work-From-Home Setup in 2023',
      items: [
        {
          title: 'Acer Aspire 5',
          description:
            'The Acer Aspire 5 offers a balance of performance and affordability, making it a great budget option for a productive work-from-home setup.',
          link: '',
          amazonLink: 'https://amzn.to/3lTGw4l',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVELB',
        },
        {
          title: 'Lenovo IdeaPad 3',
          description:
            'The Lenovo IdeaPad 3 is a reliable budget laptop that provides decent performance for day-to-day tasks in a remote work environment.',
          link: '',
          amazonLink: 'https://amzn.to/3ManQaZ',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVFYy',
        },
        {
          title: 'HP Pavilion 15',
          description:
            'The HP Pavilion 15 is a budget-friendly laptop that offers a solid performance and a comfortable keyboard, ideal for a seamless work-from-home experience.',
          link: '',
          amazonLink: 'https://amzn.to/3K6ZnRv',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVEpg',
        },
        {
          title: 'Asus VivoBook 15',
          description:
            'The Asus VivoBook 15 is a stylish and affordable laptop with a vivid display and a comfortable keyboard, perfect for remote work.',
          link: '',
          amazonLink: 'https://amzn.to/3zs37Im',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVx3Z',
        },
        {
          title: 'Dell Inspiron 15 3000',
          description:
            'The Dell Inspiron 15 3000 is a budget laptop that provides a good balance of performance and value for money, suitable for working from home.',
          link: '',
          amazonLink: 'https://amzn.to/3K3s9SW',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVxHO',
        },
        {
          title: 'Microsoft Surface Go 3',
          description:
            'The Surface Go 3 is a budget 2-in-1 laptop with a compact design and versatile performance, ideal for those working from home on a budget.',
          link: '',
          amazonLink: 'https://amzn.to/40WskWK',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVx3X',
        },
        {
          title: 'Acer Chromebook 314',
          description:
            'The Acer Chromebook 314 is an affordable Chromebook with a long battery life and a solid performance for basic tasks in a work-from-home setting.',
          link: '',
          amazonLink: 'https://amzn.to/3lYFZOm',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVxHp',
        },
        {
          title: 'Lenovo Chromebook Flex 3',
          description:
            'The Lenovo Chromebook Flex 3 is a budget 2-in-1 Chromebook with a flexible design and decent performance for everyday tasks, perfect for remote work.',
          link: '',
          amazonLink: 'https://amzn.to/3G8yRG5',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVxHJ',
        },
        {
          title: 'HP Chromebook 14',
          description:
            'The HP Chromebook 14 is an affordable laptop with a comfortable keyboard and smooth performance for basic tasks in a home office setup.',
          link: '',
          amazonLink: 'https://amzn.to/3GxW44T',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVEpg',
        },
        {
          title: 'Asus Laptop L210',
          description:
            'The Asus Laptop L210 is a compact and budget-friendly laptop that offers a solid performance for everyday tasks and web browsing, suitable for a work-from-home environment.',
          link: '',
          amazonLink: 'https://amzn.to/40Wsptw',
          lazadaLink: 'https://c.lazada.com.ph/t/c.YJVELB',
        },
      ],
    },
    {
      title: 'Top 10 Work-From-Home Websites',
      items: [
        {
          title: 'Upwork',
          description:
            'A popular freelance platform offering a wide range of job opportunities.',
          link: 'https://www.upwork.com/',
        },
        {
          title: 'Fiverr',
          description:
            'A marketplace for freelancers to offer their services and find gigs.',
          link: 'https://www.fiverr.com/',
        },
        {
          title: 'Toptal',
          description:
            'A platform that connects top freelancers with businesses in need of their services.',
          link: 'https://www.toptal.com/',
        },
        {
          title: 'Freelancer',
          description:
            'A large freelance platform with millions of projects available for freelancers.',
          link: 'https://www.freelancer.com/',
        },
        {
          title: 'Guru',
          description:
            'A platform that connects freelancers with employers to find and manage work.',
          link: 'https://www.guru.com/',
        },
        {
          title: 'PeoplePerHour',
          description:
            'A freelance marketplace that connects businesses with talented freelancers.',
          link: 'https://www.peopleperhour.com/',
        },
        {
          title: '99designs',
          description:
            'A platform that specializes in connecting freelance designers with clients.',
          link: 'https://99designs.com/',
        },
        {
          title: 'SimplyHired',
          description:
            'A job search platform with a vast array of work-from-home opportunities.',
          link: 'https://www.simplyhired.com/',
        },
        {
          title: 'Remote.co',
          description:
            'A platform that specializes in remote job opportunities for freelancers.',
          link: 'https://remote.co/',
        },
        {
          title: 'FlexJobs',
          description:
            'A platform dedicated to finding flexible and remote work opportunities.',
          link: 'https://www.flexjobs.com/',
        },
      ],
    },
  ];

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {}

  scrollTo(elementId: string): void {
    const element = this.elRef.nativeElement.querySelector(`#${elementId}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
