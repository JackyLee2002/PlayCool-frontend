import { Carousel } from "react-responsive-3d-carousel";
import "react-responsive-3d-carousel/dist/styles.css";
import Image from "next/image";
import Link from "next/link";

export default function CarouselUI() {
  const items = [
    <Link href="/song-list" key={1}>
      <Image
        src="https://nedxstgaprodfiles.blob.core.windows.net/image/neste_coldplay_collaboration_release_photo._photo_courtesy_of_coldplay_2.jpg"
        alt="image song"
        width={700}
        height={400}
        link={"https://usstore.coldplay.com/collections/cd"}
      />
    </Link>,
    <a
      href="https://usstore.coldplay.com/collections/cd"
      target="_blank"
      key={2}
    >
      <Image
        src="https://i.redd.it/v9jcnqlllw2e1.jpeg"
        alt="cd image"
        width={700}
        height={400}
        link={"https://usstore.coldplay.com/collections/cd"}
      />
    </a>,
    <Link href="/concert" target="_blank" key={3}>
      <Image
        src="https://i.redd.it/13rsjg2gyigz.jpg"
        alt="concert image"
        width={700}
        height={400}
        link={"https://usstore.coldplay.com/collections/cd"}
      />
    </Link>,
  ];

  return (
    <div
      style={{
        backgroundColor: "#0F1139",
      }}
    >
      <Carousel
        width={"700px"}
        height={"400px"}
        align="center"
        containerPadding="4rem"
        perspectiveOrigin="center"
        perspective={"1000px"}
        defaultOption={{
          angleFactor: -0.8,
          widthFactor: 1,
          depthFactor: 1,
          heightFactor: 1,
          numOfSlides: 3,
        }}
        showStatus={false}
        showIndicators={true}
        items={items}
        startIndex={0}
      />
    </div>
  );
}
