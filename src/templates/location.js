import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import ChooseProgram from "../components/ChooseProgram";
import Badges from "../components/Badges";
import Loc from "../components/Loc";
import OurPartners from "../components/OurPartners";
import { isCustomBarActive } from "../actions";
import ChooseYourProgram from "../components/ChooseYourProgram";
import UpcomingDates from "../components/UpcomingDates";
import Staff from "../components/Staff";
import "dayjs/locale/de";
import {
  Div,
  GridContainerWithImage,
  GridContainer,
} from "../components/Sections";
import { H1, H2, Paragraph } from "../components/Heading";
import { Colors, StyledBackgroundSection } from "../components/Styling";
import BaseRender from "./_baseLayout";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Icon from "../components/Icon";
import { SessionContext } from "../session";

const MapFrame = lazy(() => import("../components/MapFrame"));

const Location = ({ data, pageContext, yml }) => {
  const { lang } = pageContext;
  const { session } = React.useContext(SessionContext);
  const hiring = data.allPartnerYaml.edges[0].node;
  const images = data.allLocationYaml.edges[0].node;
  const [cohorts, setCohorts] = React.useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    process.nextTick(() => {
      if (globalThis.window ?? false) {
        setReady(true);
      }
    });
    // setTimeout(() => { setReady(true) }, 3000
  }, []);
  const chooseProgramRef = useRef(null);

  useEffect(() => {
    const loadCohorts = async () => {
      const resp = await fetch(
        `${process.env.GATSBY_BREATHECODE_HOST}/admissions/cohort/all?upcoming=true&academy=online,${yml.breathecode_location_slug}`
      );
      const data = await resp.json();
      setCohorts(data.slice(0, 3));
    };
    loadCohorts();
  }, []);

  const goToChooseProgram = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: chooseProgramRef.current?.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <>
      <GridContainerWithImage
        padding="75px 0 0 0"
        padding_tablet="0 0 20px 0"
        columns_tablet="14"
        margin={isCustomBarActive(session) ? "130px 0 24px 0" : "70px 0"}
      >
        <Div
          flexDirection="column"
          alignItems="center"
          alignItems_tablet="start"
          justifyContent_tablet="start"
          padding_tablet="70px 0 0 0"
          gridColumn_tablet="1 / 7"
        >
          <H1
            type="h1"
            textAlign_tablet="left"
            margin="0 0 11px 0"
            color="#606060"
          >
            {yml.seo_title}
          </H1>
          <H2
            textAlign_tablet="left"
            fontSize="50px"
            lineHeight="60px"
          >{`${yml.header.tagline}`}</H2>
          <Paragraph textAlign_tablet="left" margin="26px 0">
            {yml.info_box.address}{" "}
          </Paragraph>
          <Paragraph textAlign_tablet="left">{yml.info_box.phone} </Paragraph>
          {yml.info_box.whatsapp && (
            <Paragraph
              justifyContent="center"
              justifyContent_tablet="start"
              textAlign_tablet="left"
              display="flex"
              alignItems="center"
            >
              {yml.info_box.whatsapp_link ? (
                <>
                  <Div
                    width="22px"
                    height="22px"
                    alignItems="center"
                    margin="0 8px 0 0"
                  >
                    <Icon icon="whatsapp" />
                  </Div>
                  Whatsapp:
                  <a
                    href={yml.info_box.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {yml.info_box.whatsapp}
                  </a>
                </>
              ) : (
                `Whatsapp: ${yml.info_box.whatsapp}`
              )}
            </Paragraph>
          )}
          <Paragraph textAlign_tablet="left" margin="0 0 30px 0">
            {yml.info_box.email}{" "}
          </Paragraph>
          <ChooseProgram
            goTo={goToChooseProgram}
            right="15px"
            top="40px"
            textAlign="center"
            textAlign_tablet="left"
            openLabel={data.allChooseProgramYaml.edges[0].node.open_button_text}
            closeLabel={
              data.allChooseProgramYaml.edges[0].node.open_button_text
            }
          />
        </Div>
        <Div
          height="auto"
          width="100%"
          gridColumn_tablet="7 / 15"
          style={{ position: "relative" }}
        >
          <StyledBackgroundSection
            height={`495px`}
            image={yml.header.image.childImageSharp.gatsbyImageData}
            bgSize={`contain`}
            alt={yml.header.alt}
          />
        </Div>
      </GridContainerWithImage>

      <Badges
        lang={pageContext.lang}
        background={Colors.verylightGray}
        paragraph={yml.badges.paragraph}
        margin="0 0 57px 0"
        padding="27px 17px 50px 17px"
        padding_tablet="80px 0 100px 0"
      />
      <GridContainer
        columns_tablet="12"
        padding_tablet="60px 0 77px 0"
        padding="40px 17px"
      >
        <Div gridColumn_tablet="1 / 4">
          <H2 textAlign="left">{images.images_box.heading}</H2>
        </Div>
        <Div flexDirection="column" gridColumn_tablet="5 / 13">
          {images.images_box.content.split("\n").map((m, i) => (
            <Paragraph
              key={i}
              textAlign="left"
              margin="0 0 20px 0"
              fontSize="15px"
              lineHeight="26px"
            >
              {m}
            </Paragraph>
          ))}
        </Div>
      </GridContainer>
      {yml.images_box.images && (
        <GridContainer
          columns_tablet="10"
          gridTemplateRows_tablet="repeat(4, 1fr)"
          gridTemplateAreas={`
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
        'image3 image3 image3 image3 image5 image5 image5 image5 image5 image5'
        'image4 image4 image4 image4 image5 image5 image5 image5 image5 image5'
        `}
          gridTemplateAreas_tablet={`
          'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
          'image1 image1 image1 image1 image1 image1 image1 image2 image2 image2'
          'image3 image3 image3 image3 image5 image5 image5 image5 image5 image5'
          'image4 image4 image4 image4 image5 image5 image5 image5 image5 image5'
          `}
          height_tablet="813px"
          height="304px"
          childHeight="inherit"
        >
          {yml.images_box.images.map((m, i) => {
            return (
              <GatsbyImage
                style={{ gridArea: `image${i + 1}`, borderRadius: "3px" }}
                key={i}
                image={getImage(m.path.childImageSharp.gatsbyImageData)}
                alt={m.alt}
              />
            );
          })}
        </GridContainer>
      )}
      <OurPartners
        images={hiring.partners.images}
        showFeatured
        marquee
        title={hiring.partners.tagline}
        paragraph={hiring.partners.sub_heading}
      ></OurPartners>
      <ChooseYourProgram
        chooseProgramRef={chooseProgramRef}
        lang={pageContext.lang}
        programs={data.allChooseYourProgramYaml.edges[0].node.programs}
      />
      <UpcomingDates
        lang={pageContext.lang}
        location={yml.breathecode_location_slug}
        message={yml.upcoming.no_dates_message}
        actionMessage={yml.upcoming.actionMessage}
      />
      <Loc lang={pageContext.lang} locations={data.test.edges} />
      <Staff lang={pageContext.lang} />

      {/* IFRAME map */}
      <Div>
        {!ready ? (
          <H1>Loading Map...</H1>
        ) : (
          <Suspense fallback={<H1>Loading Map...</H1>}>
            {yml.info_box.iframeMapUrl === "" ? null : (
              <MapFrame
                src={ready ? yml.info_box.iframeMapUrl : "about:blank"}
                width="100%"
                height="492px"
              />
            )}
          </Suspense>
        )}
      </Div>
    </>
  );
};

export const query = graphql`
  query LocationQuery($file_name: String!, $lang: String!) {
    allLocationYaml(
      filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang } } }
    ) {
      edges {
        node {
          seo_title
          active_campaign_location_slug
          name
          breathecode_location_slug
          header {
            tagline
            paragraph
            sub_heading
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 1200
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 1200, quality: 100){
                #     ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
            alt
          }
          button_header {
            button_text
            button_link
          }
          button {
            apply_button_link
            apply_button_text
            cohort_more_details_text
            syllabus_button_text
            syllabus_submit_text
          }
          badges {
            title
            paragraph
          }
          news {
            title
          }
          upcoming {
            no_dates_message
            actionMessage
          }
          info_box {
            heading
            map_url
            address
            iframeMapUrl
            phone
            email
            contact_heading
            whatsapp
            whatsapp_link
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 800, quality: 100){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
            alt
          }
          meta_info {
            title
            description
            image
            keywords
          }
          images_box {
            heading
            content
            images {
              path {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 800
                    quality: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 800, quality: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              alt
            }
          }
        }
      }
    }
    test: allLocationYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          city
          name
          meta_info {
            slug
            title
            description
            visibility
            position
            image
            keywords
          }
          seo_title
          active_campaign_location_slug
          breathecode_location_slug
          header {
            sub_heading
            tagline
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  quality: 100
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 800){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
          }
          prices {
            full_stack {
              full_time {
                slug
              }
              part_time {
                slug
              }
            }
          }
          info_box {
            heading
            address
            contact_heading
            phone
            email
            image {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                  width: 800
                  placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                )
                # fluid(maxWidth: 800){
                #   ...GatsbyImageSharpFluid_withWebp
                # }
              }
            }
          }
          images_box {
            images {
              path {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              alt
            }
            content
            heading
          }
        }
      }
    }
    allChooseYourProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            link
            sub_title
            title
            description
            icon
          }
        }
      }
    }
    allPartnerYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          partners {
            tagline
            sub_heading
            footer_tagline
            footer_button
            footer_link
            images {
              name
              link
              follow
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 150
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 150){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              featured
            }
          }
          coding {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          influencers {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              featured
            }
            tagline
            sub_heading
          }
          financials {
            images {
              name
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED # --> CONSTRAINED || FIXED || FULL_WIDTH
                    width: 100
                    placeholder: NONE # --> NONE || DOMINANT_COLOR || BLURRED | TRACED_SVG
                  )
                  # fluid(maxWidth: 100){
                  #   ...GatsbyImageSharpFluid_withWebp
                  # }
                }
              }
              featured
            }
            tagline
            sub_heading
          }
        }
      }
    }

    allChooseProgramYaml(filter: { fields: { lang: { eq: $lang } } }) {
      edges {
        node {
          programs {
            text
            link
            visibility
            location_bc_slug
            schedule
          }
          open_button_text
          close_button_text
        }
      }
    }
  }
`;

export default BaseRender(Location);
