import { Component, OnInit, ElementRef } from '@angular/core';

interface TopTenItem {
  title: string;
  description: string;
  link: string;
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
      title: 'Top 10 E-Wallets in the Philippines',
      items: [
        {
          title: 'GCash',
          description: 'A popular mobile wallet app that allows users to send money, pay bills, and shop online.',
          // link: 'https://www.gcash.com/',
          link: 'https://gcsh.app/r/hlEe7bL',
        },
        {
          title: 'PayMaya',
          description: 'A digital wallet that offers a convenient way to pay bills, shop online, and send money with just a few taps on your smartphone.',
          // link: 'https://www.paymaya.com/',
          link: 'https://www.maya.ph/app/registration?invite=LE8G1ZX243VQ',
        },
        {
          title: 'Coins.ph',
          description: 'A mobile wallet that provides an easy way to buy and sell cryptocurrencies, pay bills, and send money.',
          link: 'https://coins.ph/',
        },
        {
          title: 'GrabPay',
          description: 'A digital wallet by Grab that allows you to pay for Grab services and make purchases at partner merchants.',
          link: 'https://www.grab.com/ph/pay/',
        },
        {
          title: 'Smart Padala',
          description: 'A remittance service that offers cash transfers, bill payments, and loading services through its extensive agent network.',
          link: 'https://smartpadala.ph/',
        },
        {
          title: 'UnionBank Online',
          description: 'UnionBank of the Philippines offers a digital banking platform that includes a mobile wallet for easy money transfers and bill payments.',
          link: 'https://www.unionbankph.com/personal/digital-banking/online',
        },
        {
          title: 'BDO Pay',
          description: 'A mobile wallet by BDO Unibank that offers convenient cashless transactions, bill payments, and QR code payments.',
          link: 'https://www.bdo.com.ph/bdopay',
        },
        {
          title: 'LandBank Mobile Banking',
          description: 'The mobile banking app of LandBank of the Philippines that offers a digital wallet for quick money transfers and transactions.',
          link: 'https://www.landbank.com/mobile-banking',
        },
        {
          title: 'BPI Mobile Wallet',
          description: 'Bank of the Philippine Islands offers a mobile wallet as part of its mobile banking app, allowing for easy money transfers, bill payments, and account management.',
          link: 'https://www.bpi.com.ph/mobile-banking',
        },
        {
          title: 'Metrobank Mobile Banking',
          description: 'Metrobank\'s mobile app offers a digital wallet feature for convenient money transfers, bill payments, and account management.',
          link: 'https://www.metrobank.com.ph/mobile_banking.asp',
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
    }
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
