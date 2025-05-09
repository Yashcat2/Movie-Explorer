import React from 'react';
import Slider from 'react-slick';
import { Container, Typography, Box } from '@mui/material';

import slide1 from '../assests/ar.png';
import slide2 from '../assests/tr.png';
import slide3 from '../assests/ww.png';
import slide4 from '../assests/yn.png';
import slide5 from '../assests/sz.png';

const images = [slide1, slide2, slide3, slide4, slide5];

 

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <Container maxWidth="md">
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Movie App
      </Typography>
      <Typography variant="body1">
        Search and discover your favorite movies!
      </Typography>
      <Slider {...settings}>
      {images.map((img, index) => (
          <Box key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
            />
          </Box>
        ))}
      </Slider>

    </Box>
  </Container>
  )
}

export default Home;



//   return (
//     <Box sx={{ maxWidth: '800px', margin: 'auto', mt: 4 }}>
      
//     </Box>
//   );
// };

// export default Slideshow;
