import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";

// styles
const pageStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

// title
const titleStyles = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

// name
const nameStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

// markup
const IndexPage = (props) => {
  return (
    <div style={pageStyles}>
      <h1 style={titleStyles}>Using dynamic image in gatsby-plugin-image</h1>
      {props.data.photos.edges.map((img) => (
        <div key={img.node.id}>
          <GatsbyImage
            fluid={img.node.childImageSharp.fluid}
            alt={img.node.base.split("-").join(" ").split(".")[0]}
            image={getImage(img.node)}
          />
          <h2 style={nameStyle}>
            {img.node.base.charAt(0).toUpperCase() +
              img.node.base.substr(1).split("-").join(" ").split(".")[0]}
          </h2>
        </div>
      ))}
    </div>
  );
};

export const pageQuery = graphql`
  query {
    photos: allFile(
      sort: { fields: base, order: ASC }
      filter: { extension: { regex: "/(jpeg)/" } }
    ) {
      edges {
        node {
          id
          base
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              height: 400
              formats: AUTO
              width: 600
              quality: 70 # 50 by default
              transformOptions: { grayscale: true }
            )
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
export default IndexPage;
