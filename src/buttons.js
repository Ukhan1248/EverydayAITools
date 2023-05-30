import {
  FaBookOpen,
  FaBullhorn,
  FaComment,
  FaCommentDots,
  FaEnvelopeOpenText,
  FaFileAlt,
  FaFilm,
  FaPenNib,
  FaRegStar,
  FaSearch,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { GiPencilBrush } from "react-icons/gi";
import { IoMdListBox } from "react-icons/io";
import { MdLibraryBooks } from "react-icons/md";
const buttons = [
  {
    text: "Article Intro",
    url: "/apps/articleintro/articleintro",
  },
  {
    text: "Article Title",
    url: "/apps/articletitle/articletitle",
  },
  {
    text: "Book Review",
    url: "/apps/bookreview/bookreview",
  },
  {
    text: "Cover Letter",
    url: "/apps/coverletter/coverletter",
  },
  {
    text: "Essay Outliner",
    url: "/apps/essayoutliner/essayoutliner",
  },
  {
    text: "Group Event Email",
    url: "/apps/eventemail/eventemail",
  },
  {
    text: "Linkedin About Me",
    url: "/apps/linkedinaboutme/linkedinaboutme",
  },
  {
    text: "Marketing Email",
    url: "/apps/marketingemail/marketingemail",
  },
  {
    text: "Movie Script",
    url: "/apps/moviescript/moviescript",
  },
  {
    text: "Product Description",
    url: "/apps/productdescription/productdescription",
  },
  {
    text: "Product Review",
    url: "/apps/productreview/productreview",
  },
  {
    text: "Recruiter Response",
    url: "/apps/recruiterresponse/recruiterresponse",
  },
  {
    text: "SEO Content Optimizer",
    url: "/apps/contentoptimizer/contentoptimizer",
  },
  {
    text: "Service Calls",
    url: "/apps/servicecalls/servicecalls",
  },
  {
    text: "Slogan Creator",
    url: "/apps/slogancreator/slogancreator",
  },
  {
    text: "Social Media Post",
    url: "/apps/socialmedia/socialmedia",
  },
];
const icons = {
  "Article Intro": <MdLibraryBooks />,
  "Article Title": <FaTags />,
  "Book Review": <FaBookOpen />,
  "Cover Letter": <FaEnvelopeOpenText />,
  "Essay Outliner": <GiPencilBrush />,
  "Group Event Email": <FaUsers />,
  "Linkedin About Me": <FaSearch />,
  "Marketing Email": <FaBullhorn />,
  "Movie Script": <FaFilm />,
  "Product Description": <FaComment />,
  "Product Review": <FaRegStar />,
  "Recruiter Response": <FaCommentDots />,
  "SEO Content Optimizer": <FaSearch />,
  "Service Calls": <IoMdListBox />,
  "Slogan Creator": <FaPenNib />,
  "Social Media Post": <FaFileAlt />,
};

export { buttons, icons };
