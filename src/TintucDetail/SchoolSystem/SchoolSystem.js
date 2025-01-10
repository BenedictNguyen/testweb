import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../SchoolSystem/SchoolSystem.css'
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer';
import apiUrls from '../../backend/mockAPI';

const SchoolSystemDetail = () => {
  const { id } = useParams();
  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    fetch(apiUrls.thuanPham)
      .then(response => response.json())
      .then(data => {
        const school = data.find(school => school.id === id);
        setSchoolData(school);
      });
  }, [id]);

  if (!schoolData) return <div>Loading...</div>;

  return (
    <div className="school-system-container">
      <Header />
      <div className="school-system-body">
        <h1 className="school-title">{schoolData.title}</h1>
        <img src={schoolData.imageUrl} alt={schoolData.title} className="school-image" />
        <section className="school-info">
          <h2 className="section-title">I. Thông tin chung</h2>
          <p>{schoolData.content}</p>
        </section>
        <section className="school-info">
          <h2 className="section-title">II. Chương trình đào tạo</h2>
          <p>{schoolData.content}</p>
        </section>
        <section className="school-info">
          <h2 className="section-title">III. Học bổng</h2>
          <p>{schoolData.content}</p>
        </section>
        <section className="school-info">
          <h2 className="section-title">IV. Vì sao bạn chọn trường này</h2>
          <p>{schoolData.content}</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SchoolSystemDetail;