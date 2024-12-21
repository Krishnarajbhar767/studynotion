import React from 'react'

function ReviewSlider() {
        const fakeReviews = [
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good,Hii This Tutorial Is So Good,Hii This Tutorial Is So Good.Hii This Tutorial Is So Good,Hii This Tutorial Is So Good,Hii This Tutorial Is So Good Hii This Tutorial Is So Good,Hii This Tutorial Is So Good,Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:2.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="},
                {userName:"Krishna",reviews:"Hii This Tutorial Is So Good",courseName:"Dot Batch" , rating:4.5,profilePicture:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="}
              ]
  return (
<div className="min-h-[200px] h-fit w-11/12 max-w-maxContent mx-auto mt-16 overflow-hidden flex gap-7">
                  {
                  fakeReviews.map((eachReviews,idx)=>{
                    const numberOfrating = parseInt(eachReviews.rating)
                    const rating = new Array(numberOfrating).fill(0);
                  if (eachReviews.reviews.length >145) {
                    eachReviews.reviews = eachReviews.reviews.slice(0,145) +"...";
                  }
                    return <div className="text-white min-h-[150px] w-[23.380%] flex flex-col justify-around max-h-[250px] text-wrap p-3  flex-shrink-0 bg-richblack-700">
                    <div className="flex gap-4 items-center">
                      <img src={eachReviews.profilePicture} className="h-[60px] w-[60px] rounded-full  object-cover"  />
                      <div><h1>{eachReviews.userName}</h1> <p>{eachReviews.courseName}</p></div>
                    </div>
                    <h1 className="my-2">{eachReviews.reviews}</h1>
                    <div className="flex gap-6"><h2>{eachReviews.rating}</h2><h3>{rating.map((rating,idx)=>"⭐")}</h3></div>
                  </div>
                  })
                }

                    
                  </div>
  )
}

export default ReviewSlider