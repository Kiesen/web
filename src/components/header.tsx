import React, { FC } from 'react'
import styled from 'styled-components'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { BASE } from 'src/constants/routes'
import * as icons from 'src/constants/icons'

import { staticQuerySiteMetaData } from 'src/types/staticQueryTypes'

const iconMap = new Map()
iconMap.set(icons.GITHUB, <FontAwesomeIcon icon={faGithub} />)
iconMap.set(icons.LINKEDIN, <FontAwesomeIcon icon={faLinkedinIn} />)
iconMap.set(icons.TWITTER, <FontAwesomeIcon icon={faTwitter} />)

const StyledHeader = styled.header`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  h1:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 15px;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  h1:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`

const StyledNavigation = styled.nav`
  a:not(:last-child) {
    margin-right: 20px;
  }

  svg {
    font-size: 25px;
  }

  a:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -10px;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  a:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`
const Header: FC<{}> = () => {
  const {
    site: {
      siteMetadata: { social },
    },
  }: staticQuerySiteMetaData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              url
              key
            }
          }
        }
      }
    `
  )

  return (
    <StyledHeader>
      <Link to={BASE}>
        <h1>Frederik Aulich</h1>
      </Link>
      <StyledNavigation>
        {social.map((entry, i) => (
          <a key={i} href={entry.url}>
            {iconMap.get(entry.key)}
          </a>
        ))}
      </StyledNavigation>
    </StyledHeader>
  )
}

export default Header
