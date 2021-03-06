import React from 'react';
import styled from 'styled-components';
import { colors, device } from 'styles';
import {
  githubImg,
  instagramImg,
  aisuImg,
  dannyImg,
  jouImg,
  cactusImg,
} from 'assets';

const userLink = {
  aisuGithub: 'https://github.com/aisu-programming',
  aisuInstagram: 'https://www.instagram.com/ntnu_aisu/',
  jouGithub: 'https://github.com/a33068843',
  jouInstagram: 'https://www.instagram.com/tako_how1113/',
  dannyGithub: 'https://github.com/danny-git1005',
  dannyInstagram:
    'https://www.instagram.com/ne5602ne5602n/',
  cactusGithub: 'https://github.com/cactus8603',
  cactusInstagram: '',
};

const Title = styled.h3`
  color: ${colors.white};
  font-size: 24px;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 12px;
`;
const Content = styled.div`
  // width: 100%;
  // height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex: 1;
  background: ${colors.gray500};
  border-radius: 4px;

  @media ${device.phone} {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.div`
  color: ${colors.gray200};
  display: flex;
  padding: 20px;

  @media ${device.phone} {
    border-top: 2px solid ${colors.gray600}${colors.opacity80};
    &:first-of-type {
      border-top: none;
    }
  }
`;
const Avatar = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 16px;
  overflow: hidden;

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

  @media ${device.phone} {
    width: 100px;
    height: 100px;

    img {
      width: 100px;
      height: 100px;
    }
  }
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;
const Name = styled.h4`
  color: ${colors.white};
  font-size: 18px;
  margin-bottom: 12px;

  @media ${device.phone} {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;
const Info = styled.h5`
  color: ${colors.gray300};
  font-size: 14px;
  margin-bottom: 4px;

  @media ${device.phone} {
    font-size: 12px;
  }
`;
// Link Style
const LinkImg = styled.a`
  width: 32px;
  height: 32px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;

  img {
    width: 32px;
    height: 32px;
  }

  @media ${device.phone} {
    width: 24px;
    height: 24px;

    img {
      width: 24px;
      height: 24px;
    }
  }
`;
const Box = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 0px;
  }
  @media ${device.tableSmall} {
    flex-direction: column;
  }
`;
const BoxColumn = styled(Box)`
  flex-direction: column;
`
const BoxRow = styled(Box)`
  flex-direction: row;
`
const Text = styled.h5`
  color: ${colors.gray300};
  font-size: 14px;
  margin-right: 12px;
  transform: translateY(2px);
  flex-shrink: 0;

  @media ${device.tableSmall} {
    margin-right: 0;
    margin-bottom: 4px;
  }
  @media ${device.phone} {
    font-size: 12px;
  }
`;
const SubText = styled.h5`
  color: ${colors.gray200};
  line-height: 1.2rem;

  @media ${device.phone} {
    font-size: 14px;
  }
`;
const Work = ({ text }) => {
  return (
    <Box>
      <Text>????????????</Text>
      <SubText>{text}</SubText>
    </Box>
  );
};
const Interest = ({ text }) => {
  return (
    <Box>
      <Text>??????</Text>
      <SubText>{text}</SubText>
    </Box>
  );
};
const Link = ({ github, instagram }) => {
  return (
    <BoxColumn>
      <Info>????????????</Info>
      <BoxRow>
        <LinkImg href={github} target={'_blank'}>
          <img
            style={{ filter: 'invert(1)' }}
            src={githubImg}
          />
        </LinkImg>
        {!!instagram && (
          <LinkImg href={instagram} target={'_blank'}>
            <img src={instagramImg} />
          </LinkImg>
        )}
      </BoxRow>
    </BoxColumn>
  );
};

const Developer = ({ name, work, avatar, children }) => {
  return (
    <Card>
      <Avatar>
        <img src={avatar} />
      </Avatar>
      <Detail>
        <Name>{name}</Name>
        {children}
      </Detail>
    </Card>
  );
};

export const Developers = () => {
  return (
    <>
      <Title>?????????</Title>
      <Content>
        <Developer
          name={'????????? (??????)'}
          avatar={aisuImg}
        >
          <Work text={'???????????????????????????????????? AI (????????????)???????????????????????????'} />
          <Interest text={'????????????'} />
          <Link
            github={userLink.aisuGithub}
            instagram={userLink.aisuInstagram}
          />
        </Developer>
        <Developer
          name={'????????? (??????)'}
          avatar={jouImg}
        >
          <Work text={'?????????UI/UX'} />
          <Interest text={'?????????UI/UX'} />
          <Link
            github={userLink.jouGithub}
            instagram={userLink.jouInstagram}
          />
        </Developer>
        <Developer
          name={'????????? (??????)'}
          avatar={dannyImg}
        >
          <Work text={'????????????'} />
          <Interest text={'????????????'} />
          <Link
            github={userLink.dannyGithub}
            instagram={userLink.dannyInstagram}
          />
        </Developer>
        <Developer
          name={'????????? (????????????)'}
          avatar={cactusImg}
        >
          <Work text={'??????????????????'} />
          <Interest text={'??????'} />
          <Link
            github={userLink.cactusGithub}
            instagram={''}
          />
        </Developer>
      </Content>
    </>
  );
};
