import React from 'react';
import { Carousel } from 'react-bootstrap';

const SuccessStories = () => {
  return (
    <div className="success-stories">
      <h2 className="section-title">Our Success Stories</h2>

      <Carousel controls={true} indicators={true} fade>
        {/* First Item */}
        <Carousel.Item>
          <div className="carousel-card">
            <h3 className="card-title">BBC's Story</h3>
            <p className="card-text">BBC used our services to enhance their customer reach and saw a 30% increase in their viewership!</p>
            <footer className="blockquote-footer">Success: "Your success is our priority!"</footer>
          </div>
        </Carousel.Item>

        {/* Second Item */}
        <Carousel.Item>
          <div className="carousel-card">
            <h3 className="card-title">LBC Radio's Journey</h3>
            <p className="card-text">LBC Radio grew its audience by 40% after leveraging SuGaR Media’s targeted marketing strategy!</p>
            <footer className="blockquote-footer">Impact: "Reach more, grow faster!"</footer>
          </div>
        </Carousel.Item>

        {/* Third Item */}
        <Carousel.Item>
          <div className="carousel-card">
            <h3 className="card-title">ITV4's Achievement</h3>
            <p className="card-text">ITV4 increased its channel subscriptions by 50% using our media solutions!</p>
            <footer className="blockquote-footer">Engagement: "Every click counts!"</footer>
          </div>
        </Carousel.Item>

        {/* Fourth Item */}
        <Carousel.Item>
          <div className="carousel-card">
            <h3 className="card-title">Company A's Growth</h3>
            <p className="card-text">Company A saw significant growth in their online engagement through our strategies!</p>
            <footer className="blockquote-footer">Success: "Together we achieve more!"</footer>
          </div>
        </Carousel.Item>

        {/* Fifth Item */}
        <Carousel.Item>
          <div className="carousel-card">
            <h3 className="card-title">Company B's Transformation</h3>
            <p className="card-text">Company B transformed their brand image through our creative approach!</p>
            <footer className="blockquote-footer">Innovation: "Creativity is the key to success!"</footer>
          </div>
        </Carousel.Item>

        {/* Sixth Item */}
        <Carousel.Item>
          <div className="carousel-card">
            <h3 className="card-title">Company C's Expansion</h3>
            <p className="card-text">Company C expanded their market presence by utilizing our targeted campaigns!</p>
            <footer className="blockquote-footer">Growth: "Expanding horizons, reaching goals!"</footer>
          </div>
        </Carousel.Item>
      </Carousel>

      {/* Quote Section Below the Carousel */}
      <div className="quote-section">
        <div className="quote">
          <p>"The best way to predict the future is to create it."</p>
          <footer className="quote-footer">
            <cite>Abraham Lincoln</cite>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
