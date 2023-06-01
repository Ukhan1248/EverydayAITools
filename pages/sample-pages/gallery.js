import React, { useState } from "react";
import { Row } from "reactstrap";
import BreadCrumbs from "../../src/layouts/breadcrumbs/BreadCrumbs";

const Gallery = () => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [modal5, setModal5] = useState(false);
  const [modal6, setModal6] = useState(false);
  const [modal7, setModal7] = useState(false);
  const [modal8, setModal8] = useState(false);
  const [modal11, setModal11] = useState(false);
  const [modal12, setModal12] = useState(false);
  const [modal13, setModal13] = useState(false);
  const [modal14, setModal14] = useState(false);
  const [modal15, setModal15] = useState(false);
  const [modal16, setModal16] = useState(false);
  const [modal17, setModal17] = useState(false);

  const toggle1 = () => {
    setModal1(!modal1);
  };

  const toggle2 = () => {
    setModal2(!modal2);
  };

  const toggle3 = () => {
    setModal3(!modal3);
  };

  const toggle4 = () => {
    setModal4(!modal4);
  };

  const toggle5 = () => {
    setModal5(!modal5);
  };

  const toggle6 = () => {
    setModal6(!modal6);
  };

  const toggle7 = () => {
    setModal7(!modal7);
  };

  const toggle8 = () => {
    setModal8(!modal8);
  };

  const toggle11 = () => {
    setModal11(!modal11);
  };
  const toggle12 = () => {
    setModal12(!modal12);
  };
  const toggle13 = () => {
    setModal13(!modal13);
  };
  const toggle14 = () => {
    setModal14(!modal14);
  };
  const toggle15 = () => {
    setModal15(!modal15);
  };
  const toggle16 = () => {
    setModal16(!modal16);
  };
  const toggle17 = () => {
    setModal17(!modal17);
  };

  return (
    <>
      <BreadCrumbs />
      <Row></Row>
      <h4 className="mb-5 mt-4">Other Gallery</h4>
    </>
  );
};

export default Gallery;
