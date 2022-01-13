import { VStack, Box, Text, Fab } from "native-base";
import React from "react";
import OverviewText from "../../components/home/OverviewText";
import { Ionicons } from "@expo/vector-icons";
import CourseUpdateTile from "../../components/home/CourseUpdateTile";
import { useAppSelector } from "../../redux";
import ScrapeProgressModal, {
  REFRESH_STATE,
} from "../../components/home/ScrapeProgressModal";
import {
  // encryptPassword,
  fetchRefreshedData,
  getPublicKey,
} from "../../utils/api";
import updateModules from "../../utils/projection";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../interfaces/navigatorInterfaces";
import RefreshErrorModal from "../../components/home/RefreshErrorModal";
import { AxiosError } from "axios";
import { INTERNAL_ERROR } from "../../utils/error";

type Props = DrawerScreenProps<RootDrawerParamList, "Home">;
const CourseHomePage = ({ navigation }: Props) => {
  const [expandIndex, setExpandIndex] = React.useState(-1);
  const [openScrapeModal, setOpenScrapeModal] = React.useState(false);
  const [refreshState, setRefreshState] = React.useState<REFRESH_STATE>(
    REFRESH_STATE.UNKNOWN
  );
  const [refreshError, setRefreshError] = React.useState<string | null>(null);
  const dashboard = useAppSelector((state) => state.dashboard);
  const courses = useAppSelector((state) => state.courses);
  const { username, password } = useAppSelector((state) => state.credentials);
  return (
    <VStack paddingTop='3'>
      <Fab
        position='absolute'
        borderRadius='full'
        colorScheme='emerald'
        icon={<Ionicons name='refresh' size={24} color='white' />}
        label={
          <Text fontWeight='semibold' fontSize='xl' color='white'>
            Refresh
          </Text>
        }
        onPress={async () => {
          try {
            setOpenScrapeModal(true);
            if (username === "" || password === "") {
              navigation.navigate("Settings", {
                openAbout: false,
                openCourses: false,
                openCreds: true,
                openNotifs: false,
              });
              return;
            }
            // setRefreshState(REFRESH_STATE.ENCRYPTING);
            // const publicKey = await getPublicKey();
            // const encryptedPwd = await encryptPassword(password, publicKey);
            setRefreshState(REFRESH_STATE.FETCHING);
            const scrapedData = await fetchRefreshedData(username, password);
            setRefreshState(REFRESH_STATE.PROJECTING);
            await updateModules(scrapedData);
            setRefreshState(REFRESH_STATE.COMPLETE);
          } catch (e) {
            console.log(e);
            const err = e as AxiosError;
            let errData = err.response?.data;
            console.log(errData);
            if (typeof errData !== "string") {
              errData = `${INTERNAL_ERROR.name}: ${INTERNAL_ERROR.message}`;
            }
            setRefreshError(errData);
          } finally {
            setOpenScrapeModal(false);
            setRefreshState(REFRESH_STATE.UNKNOWN);
          }
        }}
      />
      <ScrapeProgressModal
        isOpen={openScrapeModal}
        refreshState={refreshState}
      />
      <RefreshErrorModal
        err={refreshError}
        onClose={() => setRefreshError(null)}
      />
      <Box paddingX='4'>
        <Box>
          <Text fontSize='2xl' fontWeight='semibold'>
            Last Update:
          </Text>
        </Box>
        <Box paddingLeft='2'>
          <Box marginBottom='5'>
            <Text fontSize='lg' fontWeight='semibold'>
              Last updated at {dashboard.lastUpdatedTime}
            </Text>
          </Box>
          <Box>
            <OverviewText
              text={`${dashboard.added.length} modules added`}
              iconColor='#0ea5e9'
              iconName='add-circle'
            />
            <OverviewText
              text={`${dashboard.modified.length} modules modified`}
              iconColor='#f59e0b'
              iconName='information-circle'
            />
            <OverviewText
              text={`${dashboard.completed.length} modules completed`}
              iconColor='#10b981'
              iconName='checkmark-circle'
            />
          </Box>
        </Box>
        <Box marginY='2'>
          <Text fontSize='2xl' fontWeight='semibold'>
            Updates:
          </Text>
        </Box>
      </Box>
      {courses.map((val, index) => (
        <CourseUpdateTile
          key={index}
          myIndex={index}
          selIndex={expandIndex}
          action={(i: number) => setExpandIndex(i)}
          courseName={val.courseName}
          courseUrl={val.courseUrl}
        />
      ))}
    </VStack>
  );
};

export default CourseHomePage;
