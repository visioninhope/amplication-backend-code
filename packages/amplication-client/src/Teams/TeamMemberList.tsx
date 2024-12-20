import {
  Button,
  CircularProgress,
  EnumButtonStyle,
  EnumFlexItemMargin,
  EnumItemsAlign,
  EnumTextStyle,
  FlexItem,
  List,
  ListItem,
  Snackbar,
  Text,
} from "@amplication/ui/design-system";
import React from "react";
import { UserInfo } from "../Components/UserInfo";
import * as models from "../models";
import { formatError } from "../util/error";
import { pluralize } from "../util/pluralize";
import AddTeamMember from "./AddTeamMemberButton";
import useTeams from "./hooks/useTeams";

type Props = {
  team: models.Team;
  onMemberRemoved?: (team: models.Team) => void;
  onMemberAdded?: (team: models.Team) => void;
};

const TeamMemberList = React.memo(
  ({ team, onMemberRemoved, onMemberAdded }: Props) => {
    const {
      removeMembersFromTeam,
      removeMembersFromTeamError,
      removeMembersFromTeamLoading,
      addMembersToTeam,
      addMembersToTeamError,
      addMembersToTeamLoading,
    } = useTeams(team?.id);

    const errorMessage = formatError(
      addMembersToTeamError || removeMembersFromTeamError
    );

    const handleAddMembers = (userIds: string[]) => {
      addMembersToTeam(userIds);
      onMemberRemoved && onMemberAdded(team);
    };

    const handleRemoveMembers = (userId: string) => {
      removeMembersFromTeam([userId]);
      onMemberRemoved && onMemberRemoved(team);
    };

    const memberCount = team?.members?.length || 0;
    const loading = addMembersToTeamLoading || removeMembersFromTeamLoading;

    return (
      <>
        <FlexItem
          margin={EnumFlexItemMargin.Bottom}
          itemsAlign={EnumItemsAlign.Center}
          start={
            <Text textStyle={EnumTextStyle.Tag}>
              {memberCount} {pluralize(memberCount, "Member", "Members")}
            </Text>
          }
          end={
            team && (
              <AddTeamMember team={team} onAddMembers={handleAddMembers} />
            )
          }
        >
          {loading && <CircularProgress />}
        </FlexItem>
        <List>
          {team?.members?.map((member, index) => (
            <ListItem
              end={
                <Button
                  icon="trash_2"
                  buttonStyle={EnumButtonStyle.Text}
                  onClick={() => {
                    handleRemoveMembers(member.id);
                  }}
                />
              }
              key={index}
            >
              <UserInfo user={member} />
            </ListItem>
          ))}
        </List>
        <Snackbar
          open={
            Boolean(addMembersToTeamError) ||
            Boolean(removeMembersFromTeamError)
          }
          message={errorMessage}
        />
      </>
    );
  }
);

export default TeamMemberList;
