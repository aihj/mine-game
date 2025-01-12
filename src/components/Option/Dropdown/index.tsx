import { useEffect, useState } from "react";
import styled from "styled-components";

import { type LevelKeyType } from "@/types/level";
import { FaCheck } from "react-icons/fa";
import useLevelSwitch from "@hooks/useLevelSwitch";
import useModal from "@/hooks/useModal";
import { levels } from "@/constants/level";

const Dropdown = () => {
  const { currentLevel, levelSwitchHandler, levelKeys } = useLevelSwitch();
  const { modalChangeHandler } = useModal();

  const [isVisible, setIsVisible] = useState(false);

  const switchVisibleHandler = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    setIsVisible(false);
  }, [currentLevel]);

  return (
    <Wrapper>
      <GameOption onClick={switchVisibleHandler}>Game</GameOption>
      <MenuContainer $isVisible={isVisible}>
        {levelKeys.map((name) => (
          <MenuItem //
            onClick={() =>
              levelSwitchHandler({
                TITLE: name,
                X: levels[name].X,
                Y: levels[name].Y,
                MINE: levels[name].MINE,
              })
            }
            key={name}
            $cur={name}
            $name={currentLevel.TITLE}
          >
            <FaCheck className="icon" />
            {name}
          </MenuItem>
        ))}
        <Divider />
        
      </MenuContainer>
    </Wrapper>
  );
};
export default Dropdown;

const Wrapper = styled.section`
  position: relative;
`;

export const GameOption = styled.button`
  ${({ theme }) => theme.font.caption1b}
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.color.lightGray300};
  }
`;

const MenuContainer = styled.div<{ $isVisible: boolean }>`
  position: absolute;

  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  flex-direction: column;

  background-color: ${({ theme }) => theme.color.lightGray100};
  border: 4px double ${({ theme }) => theme.color.darkGray600};
`;

const MenuItem = styled.div<{ $cur?: LevelKeyType; $name?: LevelKeyType }>`
  padding: 2px 4px;
  width: 88px;
  ${({ theme }) => theme.font.caption2b}
  background-color: ${({ theme }) => theme.color.lightGray100};

  display: flex;
  gap: 2px;
  align-items: center;

  &:hover {
    color: blue;
  }

  .icon {
    opacity: ${({ $cur, $name }) => ($name && $cur === $name ? 1 : 0)};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  border-top: 1px solid ${({ theme }) => theme.color.lightGray400};
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray400};
  background-color: ${({ theme }) => theme.color.lightGray300};
`;
