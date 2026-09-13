import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import Form from "../Form/Form";
// import { useEffect } from "react";

export default function App() {
  // useEffect(() => {
  //   const handleSearch = async () => {
  //     const response = await getPhotos("Cats");
  //     console.log(response);
  //   };
  //   handleSearch();
  // }, []);

  const handleSubmit = async (query: string) => {
    const response = await getPhotos(query);
    console.log(response);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
        </Container>
      </Section>
    </>
  );
}
