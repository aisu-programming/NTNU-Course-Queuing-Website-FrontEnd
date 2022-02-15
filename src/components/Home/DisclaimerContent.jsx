import React from 'react';
import styled from 'styled-components';
import { colors } from 'styles';
import { NavLink } from 'react-router-dom';

const Title = styled.h3`
  color: ${colors.danger};
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 12px;
`;
const TextOrder = styled.ol`
  list-style: number;
  margin-left: 20px;
  // list-style-position: inside;
`
const Text = styled.li`
  color: ${colors.gray100};
  font-size: 14px;
  margin-bottom: 8px;
  line-height: 1.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const Link = styled.span`
  color: ${colors.blue};
  &:hover {
    text-decoration: underline;
  }
`

export const MiniDisclaimer = () => {
  return (
    <>
      <Title>免責聲明</Title>
      <TextOrder>
        <Text>
          本網站會記錄您的使用者資訊，但絕不將此資料挪作其他用途。
        </Text>
        <Text>
          本網站盡量力求完美的防駭措施，若不幸真的被駭客竊取資料，恕無法做任何補償。仍有疑慮者請自行評估是否登入此網站。
        </Text>
        <Text>
          本網站並非透過駭入學校系統來進行選課，而是正常管道幫使用者登記選課。
        </Text>
        <Text>
          更詳細的內容可前往 <NavLink to='/disclaimer'><Link>免責聲明</Link></NavLink>。
        </Text>
      </TextOrder>
    </>
  )
}

export const FullDisclaimer = () => {
  return (
    <>
      <TextOrder>
        <Text>
          本網站會記錄您的使用者資訊，但絕不將此資料挪作其他用途。
        </Text>
        <Text>
          本網站盡量力求完美的防駭措施，若不幸真的被駭客竊取資料，恕無法做任何補償。仍有疑慮者請自行評估是否登入此網站。
        </Text>
        <Text>
          本網站並非透過駭入學校系統來進行選課，而是正常管道幫使用者登記選課。
        </Text>
        <Text>
          當您使用本網站服務之風險由您個人承擔。用戶同意使用本網站各項功能服務基於用戶之個人意願，並同意自負任何風險。
        </Text>
        <Text>
          本網站可隨時停止或變更網頁資料與服務以及相關規定而毋需事前通知用戶。
        </Text>
        <Text>
          本網站就各項服務，不負任何明示或暗示之擔保責任。不保證各項服務之穩定、安全、無誤及不中斷。用戶需承擔使用本網站服務之所有風險及可能發生之任何損害。
        </Text>
        <Text>
          用戶在本網站填寫之資訊、個人資料等行為，純屬用戶個人行為。本網站已對其內容加密，任何由於駭客、病毒入侵而造成的暫時性關閉等影響網站運作之不可抗力而造成的資料損毀、丟失、被盜用或竄改，皆與本網站無關。
        </Text>
        <Text>
          本網站不會對使用或連結本網頁而引致任何有形或無形損失，承擔任何直接、間接、附帶、特別、衍生性或懲罰性賠償。
        </Text>
        <Text>
          對於用戶透過本網站刊登或發布任何虛假、違法資訊、侵害他人權益及欺騙、敲詐行為者，純屬用戶個人行為，本網站對此而產生的一切糾紛不負任何責任。
        </Text>
        <Text>
          若因本網站之服務引起任何爭議，本網站擁有最終解釋權。
        </Text>
      </TextOrder>
    </>
  );
};
