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
