import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { MdCircle, MdStar } from 'react-icons/md';

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
  display: flex;
  flex-direction: column;
  flex: 1;
  // padding: 10px 10px;
  // background: ${colors.gray500};
  border-radius: 4px;
`;
const NoAnnounce = styled.div`
  color: ${colors.gray200};
  padding: 36px;
  margin: auto;
`;
const AnnounceBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  &:last-of-type {
    margin-bottom: none;
  }
`;
const AnnounceTitle = styled.h4`
  color: ${(props) =>
    props.isTop ? colors.danger : colors.white};
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 8px;
`;
const AnnounceDate = styled.span`
  color: ${colors.gray300};
  font-size: 14px;
  margin-left: 8px;
`;
const AnnounceText = styled.h5`
  color: ${colors.gray100};
  margin-bottom: 8px;
  line-height: 1.5rem;
  &:last-of-type {
    margin-bottom: 0;
  }
`;
const AnnounceIcon = styled.span`
  svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;

export const Announce = () => {
  const hasAnnounce = true;
  return (
    <>
      <Title>公告</Title>
      <Content>
        {!hasAnnounce && (
          <NoAnnounce>
            {'抱歉，目前沒有公告 <(_ _)>'}
          </NoAnnounce>
        )}
        {hasAnnounce && (
          <>
            <AnnounceBox>
              <AnnounceTitle isTop>
                賀落幕ヽ(✿ﾟ▽ﾟ)ノ<AnnounceDate>02/28 00:00</AnnounceDate>
              </AnnounceTitle>
              <AnnounceText>
                <AnnounceIcon>
                  <MdStar />
                </AnnounceIcon>
                本網站服務到此結束！最終總共為同學刷到 195 堂課。祝各位同學歐趴！
              </AnnounceText>
            </AnnounceBox>

            <AnnounceBox>
              <AnnounceTitle isTop>
                加退選重要事項<AnnounceDate>02/22 22:55</AnnounceDate>
              </AnnounceTitle>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                02/26(六) 23:59 將會把所有刷課中的課程狀態設為暫停。
              </AnnounceText>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                週日為緩衝時間。若要繼續刷課，請記得自行啟動，以避免週日刷到了課，週一卻無法退選的情況發生。
              </AnnounceText>
            </AnnounceBox>

            <AnnounceBox>
              <AnnounceTitle isTop>
                賀ヽ(✿ﾟ▽ﾟ)ノ<AnnounceDate>02/22 09:10</AnnounceDate>
              </AnnounceTitle>
              <AnnounceText>
                <AnnounceIcon>
                  <MdStar />
                </AnnounceIcon>
                總計已為同學刷到 100 堂課！
              </AnnounceText>
            </AnnounceBox>

            <AnnounceBox>
              <AnnounceTitle isTop>
                解答使用者疑慮
                <AnnounceDate>02/21 15:01</AnnounceDate>
              </AnnounceTitle>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                關於近幾日許多人提出的質疑與問題，已在 FAQ 解答。
              </AnnounceText>
            </AnnounceBox>
              
            <AnnounceBox>
              <AnnounceTitle isTop>
                修復完成
                <AnnounceDate>02/19 00:41</AnnounceDate>
              </AnnounceTitle>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                已修復由於 109 年通識改制，大一大二生無法正常選擇領域的問題。
              </AnnounceText>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                修復上述問題時修改了資料庫設定，故造成某些用戶選過的課程異動，還請自行調整，造成困擾十分抱歉！
              </AnnounceText>
              <AnnounceText>
                <AnnounceIcon>
                  <MdCircle />
                </AnnounceIcon>
                若遇到 BUG 可以聯繫我們 Q~Q
              </AnnounceText>
            </AnnounceBox>
          </>
        )}
      </Content>
    </>
  );
};
