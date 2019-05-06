import React from "react";
import Link from "next/link";
import { Container, Row, Col } from "../Grid";
import s from "./AppFooter.scss";

const NAV_ITEMS = [
  {
    key: "column1",
    items: [
      {
        label: "User Agreement",
        path: "/user-agreement"
      },
      {
        label: "Privacy Policy",
        path: "/privacy"
      },
      {
        label: "Ad Choices",
        path: "/ad-choices"
      },
      {
        label: "Feedback",
        path: "/feedback"
      }
    ]
  },
  {
    key: "column2",
    items: [
      {
        label: "Help Center",
        path: "/help"
      },
      {
        label: "About",
        path: "/about"
      },
      {
        label: "Blog",
        path: "/blog"
      },
      {
        label: "Developers",
        path: "/developers"
      }
    ]
  },
  {
    key: "column3",
    items: [
      {
        label: "Careers",
        path: "/careers"
      },
      {
        label: "Advertising",
        path: "/advertising"
      },
      {
        label: "Small Business",
        path: "/small-business"
      },
      {
        label: "Language",
        path: "/language"
      }
    ]
  }
]

const AppFooter = () => (
  <footer className={s.footer}>
    <Container>
      <Row>
        <Col md={3}>
          <div className={s["logo-section"]}>
            {/* PUT LOGO IMAGE HERE */}
          </div>
        </Col>
        {
          NAV_ITEMS.map((col, key) => (
            <Col md={3} sm={4} key={col.key}>
              {
                col.items.map((item, index) => (
                  <Link href={item.path} key={index}>
                    <a className={s["footer-link"]}>{item.label}</a>
                  </Link>
                ))
              }
            </Col>
          ))
        }
      </Row>
    </Container>
  </footer>
)

export default AppFooter;