import styled from 'styled-components';

const BREAKPOINTS = {
  mobile: '560px',
  tablet: '1024px',
};

export const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 120px 40px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 80px 20px 0;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: rgba(82, 188, 108, 0.4);
  border-radius: 40px;
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  color: #006e1b;
`;

export const Title = styled.h2`
  font-size: 64px;
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
  margin: 0;
  text-align: center;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 48px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 32px;
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  color: #0d1910;
  text-align: center;
  margin: 0;
  align-self: stretch;
`;

export const Card = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px;
  gap: 16px;
  align-self: stretch;
  background: #068d27;
  border: 1px solid #bebebe;
  border-radius: 32px;
  overflow: hidden;
  isolation: isolate;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 20px 20px;
  }
`;

export const CardPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 0;
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
  gap: 24px;
  flex: 1;
  z-index: 1;
  min-width: 0;
`;

export const LeftTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const LeftTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  color: #ffffff;
  margin: 0;
`;

export const LeftDesc = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  color: #ffffff;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    line-height: 110%;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FeatureItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const FeatureIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #1f993d;
  border-radius: 12px;
  flex-shrink: 0;
  font-size: 16px;
`;

export const FeatureText = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  color: #ffffff;
`;

export const QuickReply = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  gap: 10px;
  background: #1f993d;
  border-radius: 16px;
`;

export const QuickReplyRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const QuickReplyTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  color: #ffffff;
`;

export const QuickReplyText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 120%;
  color: #ffffff;
  margin: 0;
`;

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  width: 600px;
  background: #f9fcfa;
  border-radius: 16px;
  z-index: 2;
  flex-shrink: 0;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const FormTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  line-height: 100%;
  color: #068d27;
  margin: 0;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    width: 100%;
  }
`;

export const FieldLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  color: #0d1910;
`;

export const FieldInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  padding: 14px;
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 8px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  outline: none;

  &::placeholder {
    color: #9e9e9e;
    font-weight: 600;
  }

  &:focus {
    border-color: #068d27;
  }
`;

export const FieldSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  padding: 0 14px;
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 8px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  outline: none;
  appearance: none;
  cursor: pointer;

  &:focus {
    border-color: #068d27;
  }
`;

export const FormFieldFull = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-self: stretch;
`;

export const FieldTextarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 94px;
  padding: 14px;
  background: #f2f2f2;
  border: 1px solid #bebebe;
  border-radius: 8px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0d1910;
  outline: none;
  resize: none;

  &::placeholder {
    color: #9e9e9e;
    font-weight: 600;
  }

  &:focus {
    border-color: #068d27;
  }
`;

export const CheckboxRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid #bebebe;
  border-radius: 6px;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: #068d27;
`;

export const CheckboxLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;
  color: #0d1910;
`;

export const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  gap: 10px;
  align-self: stretch;
  height: 50px;
  background: #04b436;
  border: none;
  border-radius: 30px;
  font-family: 'Nunito', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;

  &:hover {
    background: #068d27;
    transform: scale(1.01);
  }

  &:active {
    transform: scale(0.99);
  }
`;
