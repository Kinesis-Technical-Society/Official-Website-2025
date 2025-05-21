"use client";

import React from "react";
import { Carousel, Card } from "@/AccertinityUI/apple-cards-carousel";
import { motion } from "framer-motion";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full pt-32 flex flex-col items-center bg-gradient-to-b from-[#0b0434] via-[#4a4b8a] to-white">
      <motion.div
        className="text-center mb-5 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-center font-orbitron">
          <span className="text-white">Tech </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-yellow-300">
            Chronicles
          </span>
        </h2>
      </motion.div>
      <Carousel items={cards} />
    </div>
  );
}


// applecardcarouseldemo.jsx
const CardContent1 = () => (
  <div className="space-y-4">
    <div className="bg-[#2a115c] p-8 md:p-14 rounded-3xl border border-purple-800/50">
      <p className="text-purple-100 text-base md:text-xl leading-relaxed">
        <span className="font-bold bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
          An analysis of AI's role in accelerating a more personalized, on-demand future and changing the everyday interactions of people, politics, and profit.
          <br /><br />
        </span>{" "}
        <h2>Unbundling: A Cross-Generational Technology-Powered Trend</h2>
        <img
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*nFbF_FCdNYb35jeIa-TtmA.png"

          className="mt-6 mb-6 w-90 mx-auto rounded-xl border-2 border-purple-700/30"
        />
        In a previous article, I introduced and labeled a massive cross-generational technology-powered trend I call “Unbundling.”<br /><br />

        Unbundling refers to breaking down traditional systems, industries, and products into their constituent components, enabling people to have more personalized experiences.<br /><br />

        In the post, I highlight several historic examples across various industries that showcase the transformative power of this process. For instance, the music industry shifted from physical albums to digital formats, allowing listeners to cherry-pick individual songs rather than purchasing an entire album. This unbundling of music disrupted traditional business models and reshaped consumer behavior.<br /><br />

        Similarly, in television, we’ve witnessed the unbundling of channels, giving rise to streaming services like Netflix and Hulu that offer à la carte programming. This shift has empowered viewers to curate their own content experience, breaking free from the constraints of traditional cable packages.<br /><br />

        In the software industry, monolithic applications have been replaced by highly polished mobile apps that tend to do just a few things really well. Users can highly personalize their mobile productivity experience, using the operating system as the connective tissue.<br /><br />

        More recently, technologies like blockchain have unbundled trust from institutions and money from governments, with peer-to-peer networks filling the gaps with immutable ledgers and distributed consensus.<br /><br />

        These examples — and many more — illustrate the profound impact of unbundling across a wide range of industries and business models.<br /><br />

        The article, however, was written before the mainstream had ever heard of Large Language Models (LLMs) like ChatGPT.<br /><br />

        These models, as predicted by my original article, further accelerate the pace and implications of the ongoing unbundling meta-trend.<br /><br />

        <h3>Intelligence Unbundled from Biological Brains</h3>

        At the most basic level, LLMs like ChatGPT challenge the notion that intelligence is exclusive to biological brains. By processing vast amounts of data and generating human-like responses, LLMs are revolutionizing our understanding of intelligence itself.<br /><br />

        Like Apple Silicon is optimized for Mac software and use cases, we can imagine an entire field of innovation dedicated to developing new substrates and computing architectures optimized for running non-biological intelligence.<br /><br />

        As AI models like ChatGPT continue to evolve and improve, we will undoubtedly see further unbundling of intelligence from its biological constraints. This shift will lead to new forms of collaboration between humans and AI, where the strengths of each can be combined to overcome their individual limitations and further amplify the personal reach and power of individuals to personalize their experience of the world.<br /><br />

        <h3>Productivity Unbundled from Work</h3>

        LLMs are also driving a wedge between traditional work and new concepts and scales of productivity. As AI becomes more capable, it is automating tasks that were once considered labor-intensive.<br /><br />

        Of course, this unbundling has the potential to free up human labor for more meaningful and creative pursuits. However, it will also force a redefinition of our understanding of productivity and its relationship with work and income.<br /><br />

        <h3>Content Unbundled from Knowledge</h3>

        Traditionally, content has been intrinsically linked to the knowledge and expertise of an individual. However, with LLMs, we are witnessing the dawn of a new era where AI-generated content sourced from simple prompts increasingly becomes indistinguishable from material written by experts.<br /><br />

        In such a world, the intrinsic link between knowledge and authorship is broken, allowing individuals to author content rooted not in what they know but rather in what they’re curious about.<br /><br />

        This will ultimately challenge our understanding of authoritative content and its relationship with knowledge. In a world where AI can create convincing and compelling content on any subject, our ability to identify real human expertise will become increasingly difficult.<br /><br />

        <h3>Insight Unbundled from Investigation & Research</h3>

        While content and expertise are important in our society, discovering genuinely new insights fundamentally moves humanity forward.<br /><br />

        Historically insight has required deep analysis and research. However, as AI-generated analysis becomes more sophisticated, insights can become unbundled from anything resembling a traditional investigative process.<br /><br />

        Instead, the skill of asking carefully crafted questions about existing datasets and patterns will likely become more valuable. This could actually result in democratizing the creation of breakthrough new ideas.<br /><br />

        <h3>What Happens Next?</h3>

        As I wrote in my original post, in many cases, we’re just at the beginning of the Unbundling process.<br /><br />

        As such, the rise of ChatGPT and similar AI technologies is just another major step in a decades-long trend of unbundling powered by technology.<br /><br />

        Like a fractal, the pattern repeats over and over.<br /><br />

        Each inexorable step forward leads to a world of increasing choices and personalization for individuals. However, it will also cause a great deal of pain, frustration, and disruption to the governments, corporations, and people caught in the transition.<br /><br />

        Taken to its logical conclusion, one could imagine a world where each individual gets precisely what they want, the moment they want it, at the perfect price, without exerting much effort. Will this be a utopia of abundance or an isolating, myopic hellscape? As with most things, it will likely be something in between.<br /><br />

        The question is, given these trends, how can you get ahead of the curve and capitalize on the new patterns and tools that emerge?

      </p>

    </div>
  </div>
);

const CardContent2 = () => (
  <div className="space-y-4">
    <div className="bg-[#2a115c] p-8 md:p-14 rounded-3xl border border-purple-800/50">
      <p className="text-purple-100 text-base md:text-xl leading-relaxed">
        <span className="font-bold bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
          In today’s digital age, web applications are an integral part of our daily lives, from social media platforms to e-commerce sites, and even educational tools. One critical aspect often overlooked in the development process is scalability. So, what exactly is scalability in the context of web applications, and why does it matter?<br /><br />
        </span>{" "}
        <h2>Understanding Scalability</h2><br />
        <p>Scalability refers to the capability of a web application to handle a growing amount of work or its potential to be enlarged to accommodate that growth. In simpler terms, it’s the ability of an application to continue to function well when it is changed in size or volume to meet a user’s requirements.</p>
        <br />

        <h2>Types of Scalability</h2><br />
        <p><strong>Vertical Scalability:</strong> Also known as scaling up, it involves adding resources to a single node within the system. This might mean upgrading the server’s hardware, adding more RAM, CPU, or disk space.</p>
        <p><strong>Horizontal Scalability:</strong> Also referred to as scaling out, this involves adding more nodes to the system. For instance, adding more servers to distribute the load.</p>
        <br />

        <h2>Importance of Scalability</h2><br />
        <p><strong>1. Improved Performance</strong><br />
          Scalable web applications can handle increased traffic and data loads efficiently. As a result, users experience faster loading times and a smoother interaction with the application.</p>

        <p><strong>2. Cost Efficiency</strong><br />
          Investing in scalability from the start can lead to significant cost savings. It’s often more economical to scale an existing application than to rebuild it entirely when demand grows.</p>

        <p><strong>3. Future-Proofing</strong><br />
          Building a scalable web application ensures that your application can adapt to future growth. This is especially critical in today’s fast-paced digital landscape where user demands and data volumes can increase rapidly.</p>
        <br />

        <h2>Challenges in Achieving Scalability</h2>
        <p><strong>Complexity:</strong> Adding more nodes or upgrading hardware can complicate the system architecture.</p>
        <p><strong>Cost:</strong> While scaling can save money in the long run, the initial investment can be substantial.</p>
        <p><strong>Maintenance:</strong> A more complex system generally requires more ongoing maintenance, monitoring, and management.</p>
        <br />

        <h2>Best Practices for Building Scalable Web Applications</h2>
        <p><strong>Use Load Balancers:</strong> Distribute incoming traffic across multiple servers to ensure no single server becomes a bottleneck.</p>
        <p><strong>Optimize Database Queries:</strong> Efficient database queries can dramatically improve performance and scalability.</p>
        <p><strong>Implement Caching:</strong> Caching frequently accessed data can reduce load times and server strain.</p>
        <p><strong>Microservices Architecture:</strong> Break down the application into smaller, independent services that can be scaled individually.</p>
        <br />

        <h2>Conclusion</h2>
        <p>Scalability is a crucial aspect of web application development. It ensures that your application remains performant, cost-effective, and future-proof as it grows. By understanding the principles of scaling and implementing best practices, you can build web applications that are ready to meet both current and future demands.</p>

      </p>

    </div>
  </div>
);

const CardContent3 = () => (
  <div className="space-y-4">
    <div className="bg-[#2a115c] p-8 md:p-14 rounded-3xl border border-purple-800/50">
      <p className="text-purple-100 text-base md:text-xl leading-relaxed">
        <span className="font-bold bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
          Hackathon Revolution:<br /><br />
        </span>{" "}

        <h2>Why Do Companies Allow Guest Blog Posts?</h2>
        <p>When a company allows writers to contribute guest blog posts, their goal is not just to get an in-depth researched article for free on their blog. They focus on:</p>
        <ul>
          <li>Getting backlinks</li>
          <li>Encouraging writers to share their work</li>
        </ul>
        <p>Result? To increase their website’s traffic, be seen by their target audience, and increase brand awareness. The same is true for companies that organize hackathons.</p>
        <br />

        <img
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*tLDkUkb6HxmQg2IE.png"

          className="mt-6 mb-6 w-110 mx-auto rounded-xl border-2 border-purple-700/30"
        />

        <h2>Why Companies Should Host Online Hackathons</h2>
        <p>However, many companies still don’t understand how online hackathons can help improve a product’s development.</p>
        <p>Let’s break the ice and understand:</p>
        <ul>
          <li>How participating in hackathons can improve automation by re-using code.</li>
          <li>The common mistakes companies make while hosting, which you can avoid.</li>
        </ul>
        <br />

        <h2>What is a Hackathon?</h2>
        <p>According to Techopedia, a hackathon is a gathering where programmers collaboratively code in an extreme manner over a short period. In simple words, a hackathon organized by companies brings experts together from different domains to drive innovations.</p>
        <p>Modern-day hackathons include:</p>
        <ul>
          <li>Sponsors</li>
          <li>Partners</li>
          <li>Recruiters</li>
        </ul>
        <p>They engage with participants through interactive workshops and presentations.</p>
        <p>For example, HackerEarth organized a global hackathon called Web3athon. It was a 2-month long event sponsored by 16 crypto and web3 brands with different themes and multiple prizes for the winners.</p>
        <br />

        <h2>Types of Hackathons</h2>
        <ul>
          <li><strong>Internal hackathons:</strong> They give companies’ employees a chance to experiment with upcoming technology and stay up-to-date with technology.</li>
          <li><strong>External hackathons:</strong> They are organized by the company where they engage with people outside the company to change company culture, improve customer experience, and find new talent and revenue opportunities.</li>
        </ul>
        <br />

        <h2>How Can Participating in Online Hackathons Improve Product Development?</h2>
        <p>Participants in hackathons develop code based on the problem statement provided by the company.</p>
        <p>Hackathon prototypes and coding solutions can be used by the company hosting the event to create a new solution in the future—either partially or fully functional. Ensure to have a clause in the terms mentioning that the IP belongs to the company, which means it owns all the code created at that event.</p>
        <p>You can then store all these coded solutions in a common repository and later re-use them to automate any existing or new processes. This way, automation becomes easy and you do not have to build a product from scratch, making the code more efficient.</p>
        <p><strong>Example:</strong> A 36-hour hackathon was conducted to address 6 IoT-based challenges. Each team was provided with an educational IoT kit that included cloud services and templates. One sponsoring company used a resulting solution to upgrade legacy refrigerators — a cost-effective and innovative outcome.</p>
        <p>Another option: Organize internal hackathons to foster creativity, generate new solutions, and build a reusable code base for future development.</p>
        <p><strong>Note:</strong> Be careful about what code is reused. Directly copying snippets from GitHub or StackOverflow without attribution is unethical.</p>
        <br />

        <h2>Common Mistakes to Avoid When Hosting Hackathons</h2>
        <p>While conducting hackathons is a gateway to developing prototypes, hosting them requires effort. Here are five common mistakes to avoid:</p>
        <ul>
          <li>Poor problem statement definition</li>
          <li>Unclear judging criteria</li>
          <li>Insufficient communication with participants</li>
          <li>Lack of mentorship during the event</li>
          <li>Failing to follow up post-event</li>
        </ul>
        <br />

        <h2>How Do Online Hackathons Benefit Developers?</h2>
        <p><strong>1. Helps Validate Their Product:</strong><br />
          Hackathons give developers a platform to test and validate their ideas. According to Ramesh Logathanan, Professor at IIT Hyderabad, “A hackathon gives participants a very good chance to validate their ideas, give it some initial shape, and get some mentor eyeballs on the idea.”</p>

        <p><strong>2. Helps Them Upskill:</strong><br />
          Developers gain hands-on experience, try new solutions, and attend workshops. This expands their skill set and boosts learning.</p>

        <p><strong>3. Helps Connect Like-Minded People:</strong><br />
          Hackathons bring together diverse developers. Kolla Krishna Madhavi from the School of Accelerated Learning says, “Hackathons help diverse individuals with varying skills come together as teams to interact, ideate, and collaborate while coming up with disruptive solutions.”</p>
        <br />

        <h2>Ready to Enhance Product Development with Hackathons?</h2>
        <p>No doubt hackathons can feel like a battle—from defining a theme to attracting sponsors. But with a structured approach and clear expectations, you can run effective events and build the next big solution from scratch or even better — from the ideas your community creates.</p>
      </p>

    </div>
  </div>
);

const CardContent4 = () => (
  <div className="space-y-4">
    <div className="bg-[#2a115c] p-8 md:p-14 rounded-3xl border border-purple-800/50">
      <p className="text-purple-100 text-base md:text-xl leading-relaxed">
        <span className="font-bold bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
          Testing Software :<br /><br />
        </span>{" "}
        <h1>Software testing plays a critical role in ensuring that applications are reliable, efficient, and meet user expectations.</h1>
        Whether you are a manual tester or transitioning into automation, leveraging the right resources can significantly boost your skills and efficiency.<br /><br />

        GitHub is home to a wealth of repositories that offer testing roadmaps, learning resources, test cases, and automation guides. We’ve curated the top seven repositories that every software tester should explore to stay ahead in the ever-evolving testing landscape.<br /><br />

        <h2>1. Awesome Quality Assurance Roadmap</h2>
        <b>Repository Link:</b> Awesome Quality Assurance Roadmap<br /><br />
        This repository provides a well-structured learning path for QA engineers and software testers. It includes a generic test plan template, expert advice on effective test planning, and a roadmap to mastering manual and automation testing.<br /><br />

        <b>Why it’s useful:</b><br />
        - Helps testers understand testing fundamentals before diving into automation<br />
        - Encourages broadening perspectives beyond server status codes<br />
        - Includes a structured career roadmap<br /><br />

        <h2>2. Free Learning Resources for Software Testers</h2>
        <b>Repository Link:</b> Free Learning Resources for Software Testers<br /><br />
        This ever-growing collection of free online learning materials covers essential topics in software testing. It is particularly valuable for testers who lack formal education in software testing, providing a structured curriculum to bridge knowledge gaps.<br /><br />

        <b>Key benefits:</b><br />
        - Offers curated lists of non-promotional, cost-free resources<br />
        - Covers both beginner and advanced testing concepts<br />
        - Encourages community contributions to keep the repository updated<br /><br />

        <h2>3. Awesome Testing Courses & Tutorials</h2>
        <b>Repository Link:</b> Awesome Testing Courses & Tutorials<br /><br />
        A carefully curated list of high-quality online courses and tutorials on software testing, test automation, and related topics. This repository is an excellent starting point for those looking to upskill through structured learning programs.<br /><br />

        <b>Why testers love it:</b><br />
        - Covers test automation, API testing, and performance testing<br />
        - Includes both free and paid courses<br />
        - Regularly updated with new learning materials<br /><br />

        <h2>4. Test Cases and Templates for Manual Software Testing</h2>
        <b>Repository Link:</b> Test Cases and Templates for Manual Software Testing<br /><br />
        A must-have for manual testers, this repository simplifies the test case creation process by offering ready-made test case templates for common scenarios.<br /><br />

        <b>Why it stands out:</b><br />
        - Provides pre-written test cases for login functionality, dropdowns, text boxes, and more<br />
        - Saves time on crafting generic test cases<br />
        - Includes a test planning checklist to improve test coverage<br /><br />

        <h2>5. How They Test</h2>
        <b>Repository Link:</b> How They Test<br /><br />
        Ever wondered how top tech companies like Google, Netflix, and Amazon approach software testing? This repository consolidates publicly available testing strategies, methodologies, and quality assurance insights from leading software companies.<br /><br />

        <b>Why you should check it out:</b><br />
        - Showcases real-world testing processes from top organizations<br />
        - Covers CI/CD, non-functional testing, and quality culture<br />
        - Helps testers understand industry best practices<br /><br />

        <h2>6. Performance Testing Resources</h2>
        <b>Repository Link:</b> Performance Testing<br /><br />
        Performance testing is crucial for ensuring software efficiency. This repository compiles backend and frontend performance testing tools, methodologies, and optimization techniques to help testers improve application speed and scalability.<br /><br />

        <b>What makes it valuable:</b><br />
        - Covers web performance optimization techniques<br />
        - Lists popular performance testing tools like JMeter and k6<br />
        - Helps testers identify and resolve bottlenecks efficiently<br /><br />

        <h2>7. Quality in Mobile Apps</h2>
        <b>Repository Link:</b> Quality in Mobile Apps<br /><br />
        With mobile apps dominating the market, ensuring their quality is more critical than ever. This repository provides testing resources specifically for iOS and Android applications.<br /><br />

        <b>Why mobile testers love it:</b><br />
        - Covers test automation frameworks for mobile apps<br />
        - Includes resources on accessibility testing<br />
        - Provides guidelines for improving mobile app performance and security<br /><br />

        <h2>Final Thoughts</h2>
        The right resources can transform a tester’s career, making workflows more efficient and improving software quality. These seven must-know GitHub repositories offer everything from career roadmaps and test case templates to automation frameworks and performance testing guides.<br /><br />

        By leveraging these repositories, testers can:<br />
        - Stay updated with industry trends<br />
        - Build a strong foundation in manual and automation testing<br />
        - Gain insights from top tech companies<br />
        - Contribute to the ever-evolving world of software testing<br /><br />

      </p>
      <div className="mt-6 p-4 bg-[#361473] rounded-xl">
        <table className="w-full text-purple-100">
          <thead className="border-b border-purple-700">
            <tr>
              <th className="pb-2 text-left">Tool</th>
              <th className="pb-2 text-left">Stars</th>
              <th className="pb-2 text-left">Language</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-purple-800">
              <td className="py-3">Playwright</td>
              <td>65k</td>
              <td>TypeScript</td>
            </tr>
            <tr>
              <td className="py-3">Cypress</td>
              <td>45k</td>
              <td>JavaScript</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const data = [
  {
    // category: "Artificial Intelligence",
    title: "The Great Unbundling Continues: How LLMs like ChatGPT are Further Ripping Apart Our World.",
    preview: "In a previous article, I introduced and labeled a massive cross-generational technology-powered trend I call “Unbundling.”<br/><br/>Unbundling refers to breaking down traditional systems, industries, and products into their constituent components, enabling people to have more personalized experiences.<br/><br/>In the post, I highlight several historic examples across various industries that showcase the transformative power of this process. For instance, the music industry shifted from physical albums to digital formats, allowing listeners to cherry-pick individual songs rather than purchasing an entire album. This unbundling of music disrupted traditional business models and reshaped consumer behavior.<br/><br/>Similarly, in television, we’ve witnessed the unbundling of channels, giving rise to streaming services like Netflix and Hulu that offer à la carte programming. This shift has empowered viewers to curate their own content experience, breaking free from the constraints of traditional cable packages.<br/><br/>",

    // src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent1 />,
  },
  {
    // category: "Productivity",
    title: "Scalability in Web Applications: What It Is and Why It Matters",
    preview: "Scalability refers to the capability of a web application to handle a growing amount of work or its potential to be enlarged to accommodate that growth.<br/><br/>In simpler terms, it’s the ability of an application to continue to function well when it is changed in size or volume to meet a user’s requirements.<br/><br/>Types of Scalability<br/><br/>There are two main types of scalability:<br/><br/>Vertical Scalability: Also known as scaling up, it involves adding resources to a single node within the system.<br/><br/>This might mean upgrading the server’s hardware, adding more RAM, CPU, or disk space.<br/><br/>Horizontal Scalability: Also referred to as scaling out, this involves adding more nodes to the system.<br/><br/>For instance, adding more servers to distribute the load.<br/><br/>",
    // src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent2 />,
  },
  {
    // category: "Product",
    title: "Online Hackathons — Accelerate the Development of Low-Code Solutions",
    preview: "When a company allows writers to contribute guest blog posts, their goal is not just to get an in-depth researched article for free on their blog.<br/><br/>They focus on:<br/><br/>Getting backlinks<br/><br/>Encouraging writers to share their work<br/><br/>Result? To increase their website’s traffic, be seen by their target audience, and increase brand awareness.<br/><br/>The same is true for companies that organize hackathons.<br/><br/>However, many companies still don’t understand how online hackathons can help improve a product’s development.<br/><br/>Let’s break the ice and understand:<br/><br/>How participating in hackathons can improve automation by re-using code.<br/><br/>The common mistakes companies make while hosting, which you can avoid.<br/><br/>",
    // src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent3 />,
  },
  {
    // category: "Product",
    title: "Top 7 Must-Know GitHub Repositories for Software Testers",
    preview: "Software testing plays a critical role in ensuring that applications are reliable, efficient, and meet user expectations.<br/><br/>Whether you are a manual tester or transitioning into automation, leveraging the right resources can significantly boost your skills and efficiency.<br/><br/>GitHub is home to a wealth of repositories that offer testing roadmaps, learning resources, test cases, and automation guides.<br/><br/>We’ve curated the top seven repositories that every software tester should explore to stay ahead in the ever-evolving testing landscape.<br/><br/>1. Awesome Quality Assurance Roadmap<br/><br/>Repository Link: Awesome Quality Assurance Roadmap<br/><br/>This repository provides a well-structured learning path for QA engineers and software testers.<br/><br/>It includes a generic test plan template, expert advice on effective test planning, and a roadmap to mastering manual and automation testing.<br/><br/>",
    // src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <CardContent4 />,
  },
];
