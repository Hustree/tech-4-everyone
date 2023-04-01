import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article1 = {
    title: 'Why Investing in a High-Quality Laptop is a Smart Decision',
    imageSrc: 'assets/article-1.png',
    introduction: `
    In today's digital age, laptops play a significant role in our personal and professional lives. From completing work tasks to streaming our favorite shows, these versatile devices are an essential part of our daily routines. With so many options available, it's crucial to invest in a high-quality laptop that meets your needs and stands the test of time. In this article, we'll discuss the importance of investing in a reliable laptop and how it can enhance your overall computing experience.
  `,
    sections: [
      {
        title: 'Improved Performance',
        content: `A high-quality laptop offers better performance compared to budget-friendly alternatives. It features a faster processor, higher RAM capacity, and a more powerful graphics card, ensuring smooth and efficient multitasking. Investing in a top-tier device enables you to run demanding applications and handle intensive tasks without compromising on speed or performance.`,
      },
      {
        title: 'Enhanced Durability',
        content: `Premium laptops are built to last, featuring sturdy construction and high-quality materials. These devices are designed to withstand the wear and tear of daily use, ensuring a longer lifespan. By investing in a well-built laptop, you can save money in the long run by avoiding frequent repairs or replacements.`,
      },
      {
        title: 'Superior Display and Audio Quality',
        content: `High-quality laptops boast superior displays with higher resolution, better color accuracy, and wider viewing angles. These features enhance your visual experience, whether you're working on a design project or binge-watching your favorite series. Additionally, premium laptops often come with advanced audio technology, delivering crisp and clear sound for an immersive multimedia experience.`,
      },
      {
        title: 'Better Battery Life',
        content: `A top-of-the-line laptop typically offers longer battery life, allowing you to work or play for extended periods without constantly searching for an outlet. This feature is particularly beneficial for professionals and students who need a reliable device to last throughout the day.`,
      },
      {
        title: 'Enhanced Security Features',
        content: `High-quality laptops come equipped with advanced security features to protect your valuable data. Fingerprint readers, facial recognition, and hardware-based encryption are just a few examples of the security measures incorporated in premium devices. These features offer peace of mind and help safeguard your sensitive information from unauthorized access.`,
      },
      {
        title: 'Higher Resale Value',
        content: `Investing in a high-quality laptop also means a higher resale value when it's time to upgrade. Premium devices tend to hold their value better than budget options, ensuring a better return on your investment.`,
      },
    ],
  };

  article2 = {
    title:
      'Why a Simple Black T-Shirt is the Ultimate Productivity Tool for Programmers',
    imageSrc: 'assets/article-2.png',
    introduction: `
    As a programmer, you know the importance of staying focused and productive throughout the day. Distractions and interruptions can quickly derail your workflow, making it challenging to meet deadlines and complete projects on time. However, did you know that a simple black T-shirt could be the ultimate productivity tool in your arsenal? In this article, we'll explore the advantages of wearing a black T-shirt and how it can help you stay on top of your game.
`,
    sections: [
      {
        title: 'Eliminates Decision Fatigue',
        content: `As a programmer, you likely spend a significant amount of time making decisions throughout the day. From choosing the right programming language to picking the best framework for a project, decision fatigue can quickly set in, leaving you feeling drained and unproductive. By wearing a simple black T-shirt every day, you eliminate the need to make one more decision. This small change can have a significant impact on your productivity and allow you to focus on more critical decisions throughout the day.`,
      },
      {
        title: 'Simplifies Your Wardrobe',
        content: `Simplicity is key when it comes to productivity. The fewer decisions you have to make, the better. By wearing a black T-shirt every day, you simplify your wardrobe and free up mental energy for more important tasks. You won't have to worry about coordinating colors or picking out the right outfit, allowing you to focus on your work and maximize your productivity.`,
      },
      {
        title: 'Boosts Confidence',
        content: `Wearing a simple black T-shirt can also boost your confidence and self-esteem. When you feel good about yourself, you're more likely to tackle challenges and take on new projects. The simplicity and minimalism of a black T-shirt can give you a sense of clarity and focus, allowing you to tackle your work with confidence and purpose.`,
      },
      {
        title: 'Saves Time and Money',
        content: `Investing in a few high-quality black T-shirts can save you both time and money in the long run. By simplifying your wardrobe and eliminating the need to purchase new clothes, you can free up more resources for other important areas of your life. Plus, black T-shirts are easy to find and can be purchased at an affordable price, making it a budget-friendly option for any programmer.`,
      },
      {
        title: 'Reflects Your Professionalism',
        content: `As a programmer, your wardrobe choices can reflect your professionalism and work ethic. By wearing a simple black T-shirt, you project a professional and serious image to your colleagues and clients. This can help build trust and credibility in your work, setting you up for success in your career.`,
      }
    ],
  };

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  constructor() {}

  ngOnInit(): void {}


}
