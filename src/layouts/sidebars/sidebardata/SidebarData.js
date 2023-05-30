import * as Icon from "react-feather";

const SidebarData = [
  { caption: "Home" },
  {
    title: "Dashboard",
    href: "/",
    id: 1,
    suffixColor: "bg-info text-dark-white",
    icon: <Icon.Grid />,
    collapisble: true,
  },
  { caption: "Everyday AI Text Generators" },
  {
    title: (
      <>
        {" "}
        Blogger/Writer <br /> AI Text Generators
      </>
    ),
    href: "/",
    id: 1,
    suffixColor: "bg-info text-dark-white",
    icon: <Icon.MessageCircle />,
    collapisble: true,
    children: [
      {
        title: "Article Intro",
        href: "/apps/articleintro/articleintro",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Article Title",
        href: "/apps/articletitle/articletitle",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Book Review",
        href: "/apps/bookreview/bookreview",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Essay Outliner",
        href: "/apps/essayoutliner/essayoutliner",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Movie Script",
        href: "/apps/moviescript/moviescript",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Social Media Post",
        href: "/apps/socialmedia/socialmedia",
        icon: <Icon.MessageCircle />,
      },
    ],
  },
  {
    title: (
      <>
        HR/Job Search <br /> AI Text Generators
      </>
    ),
    href: "/",
    id: 1,
    suffixColor: "bg-info text-dark-white",
    icon: <Icon.MessageCircle />,
    collapisble: true,
    children: [
      {
        title: "Cover Letter",
        href: "/apps/coverletter/coverletter",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Group Event Email",
        href: "/apps/eventemail/eventemail",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Linkedin About Me",
        href: "/apps/linkedinaboutme/linkedinaboutme",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Recruiter Response",
        href: "/apps/recruiterresponse/recruiterresponse",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Service Calls",
        href: "/apps/servicecalls/servicecalls",
        icon: <Icon.MessageCircle />,
      },
    ],
  },
  {
    title: (
      <>
        Ads/Marketing <br /> AI Text Generators
      </>
    ),
    href: "/",
    id: 1,
    suffixColor: "bg-info text-dark-white",
    icon: <Icon.MessageCircle />,
    collapisble: true,
    children: [
      {
        title: "Slogan Creator",
        href: "/apps/slogancreator/slogancreator",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Marketing Email",
        href: "/apps/marketingemail/marketingemail",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Product Description",
        href: "/apps/productdescription/productdescription",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "Product Review",
        href: "/apps/productreview/productreview",
        icon: <Icon.MessageCircle />,
      },
      {
        title: "SEO Content Optimizer",
        href: "/apps/contentoptimizer/contentoptimizer",
        icon: <Icon.MessageCircle />,
      },
    ],
  },
];

export default SidebarData;
