import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import UserChat from "../components/Chat/UserChat";
import PotentialChats from "../components/Chat/PotentialChats";
import ChatBox from "../components/Chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

  userChats?.sort(function (a, b) {
    // Convert the date strings to Date objects
    let dateA = new Date(a.createdAt);
    let dateB = new Date(b.createdAt);

    // Subtract the dates to get a value that is either negative, positive, or zero
    return dateB - dateA;
  });

  console.log(userChats);

  return (
    <>
      <Container>
        <PotentialChats />
        {userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
              {isUserChatsLoading && <p>Loading chats.</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      updateCurrentChat(chat);
                    }}
                  >
                    <UserChat chat={chat} user={user} />
                  </div>
                );
              })}
            </Stack>
            <ChatBox />
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Chat;
