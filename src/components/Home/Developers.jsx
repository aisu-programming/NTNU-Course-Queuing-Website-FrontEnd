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
  cactusGithub: '',
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
  margin-bottom: 8px;

  @media ${device.phone} {
    font-size: 16px;
    margin-bottom: 4px;
  }
`;
const Work = styled.h5`
  color: ${colors.gray200};
  margin-bottom: 32px;

  @media ${device.phone} {
    font-size: 14px;
    margin-bottom: 16px;
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
const Contact = styled.div`
  display: flex;
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

const Link = ({ github, instagram }) => {
  return (
    <>
      <LinkImg href={github} target={'_blank'}>
        <img
          style={{ filter: 'invert(1)' }}
          src={githubImg}
        />
      </LinkImg>
      <LinkImg href={instagram} target={'_blank'}>
        <img src={instagramImg} />
      </LinkImg>
    </>
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
        <Work>{work}</Work>
        <Info>個人連結</Info>
        <Contact>{children}</Contact>
      </Detail>
    </Card>
  );
};

export const Developers = () => {
  return (
    <>
      <Title>開發者</Title>
      <Content>
        <Developer
          name={'洪偉倫'}
          work={'編寫網頁後端 架設伺服器'}
          avatar={aisuImg}
        >
          <Link
            github={userLink.aisuGithub}
            instagram={userLink.aisuInstagram}
          />
        </Developer>
        <Developer
          name={'曹家豪'}
          work={'編寫網頁前端 UX/UI'}
          avatar={jouImg}
        >
          <Link
            github={userLink.jouGithub}
            instagram={userLink.jouInstagram}
          />
        </Developer>
        <Developer
          name={'李展緯'}
          work={'資料串接'}
          avatar={dannyImg}
        >
          <Link
            github={userLink.dannyGithub}
            instagram={userLink.dannyInstagram}
          />
        </Developer>
        <Developer
          name={'劉紹楷'}
          work={'文案撰寫'}
          avatar={cactusImg}
        >
          <Link
            github={userLink.aisuGithub}
            instagram={userLink.aisuInstagram}
          />
        </Developer>
      </Content>
    </>
  );
};
