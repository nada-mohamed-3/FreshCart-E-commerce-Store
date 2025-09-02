import Slider from 'react-slick';
import useApi from '../../Hooks/useApi';

export default function CateorySlider() {
    let {data} = useApi('categories')

    let settings = {
      slidesToShow:6,
      infinite: true,
      autoplay:true,
      speed:500,
      slidesToScroll:6,
    }

  return (
    <div className='my-5'>
      <Slider {...settings}>
        {data?.data?.data?.map((category)=>{
             return(
                <div key={category._id}>
                    <img src={category.image} className='h-48 w-full object-cover object-top' alt="" />
                    <h5 className='text-center'>{category.name}</h5>
                </div>
             )
        })}
      </Slider>
    </div>
  )
}
