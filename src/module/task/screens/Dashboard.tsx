import { heightPixel, normalize, widthPixel } from '@config/spaces'
import AddButton from '@module/shared/components/buttons/RoundButton'
import { navigationRoutes } from '@navigation/navigation.route'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'
import { RootState } from '@store/types'
import React, { useEffect, useState } from 'react'
import { SectionList, View, Text, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { GetTaskQuery, HandleTaskCompletedMutation } from '../dataBase'
import { dashboardStyle } from '../styles/index'
import { TaskResponseType, TaskSectionListType, TaskType } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getColor } from '@config/helpers'
import { useTheme } from '@react-navigation/native';
import moment from 'moment'
import SelectionButton from '@module/shared/components/forms/SelectionButton'
import PrimaryHeader from '@module/shared/components/headers/PrimaryHeader'
import PopUpMenu from '@module/shared/components/menues/PopUpMenu'
import { PopUpMenuListType } from '@module/shared/types'
import EmptyMessage from '@module/shared/components/EmptyMessage'

const POPUP_MENU = {
  all: {
    id: '1',
    title: 'All',
  },
  completed: {
    id: '2',
    title: 'Completed',
  },
  inCompleted: {
    id: '3',
    title: 'Incompleted',
  }
}

export default function Dashboard() {
  const FilterMenulist: PopUpMenuListType[] = [
    {
      id: POPUP_MENU.all.id,
      title: POPUP_MENU.all.title,
      onPress: () => setSelectedFilterType(POPUP_MENU.all),
    },
    {
      id: POPUP_MENU.completed.id,
      title: POPUP_MENU.completed.title,
      onPress: () => setSelectedFilterType(POPUP_MENU.completed),

    },
    {
      id: POPUP_MENU.inCompleted.id,
      title: POPUP_MENU.inCompleted.title,
      onPress: () => setSelectedFilterType(POPUP_MENU.inCompleted),
    },
  ]
  const [tasksSectionList, setTaskSectionList] = useState<TaskSectionListType[]>([])
  const [selectedFiltertype, setSelectedFilterType]
    = useState<Omit<PopUpMenuListType, 'onPress'>>(POPUP_MENU.inCompleted);
  const inset = useSafeAreaInsets();
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { uuid } = useSelector((state: RootState) => state.shared)
  const { colors } = useTheme();
  const tasks = GetTaskQuery(uuid);

  function toSectionList(tasksList: TaskType[]) {
    const sections: any = {};

    tasksList.forEach(currentTask => {
      const dueDate = moment(currentTask.dueDate).format('YYYY-MM-DD');
      if (!sections[dueDate]) {
        sections[dueDate] = { section: dueDate, data: [] };
      }

      if (selectedFiltertype.id == POPUP_MENU.inCompleted.id) {
        if (!currentTask.isCompleted)
          sections[dueDate].data.push(currentTask);
      }
      else if (selectedFiltertype.id == POPUP_MENU.completed.id) {
        if (currentTask.isCompleted)
          sections[dueDate].data.push(currentTask);
      }
      else if (selectedFiltertype.id == POPUP_MENU.all.id) {
        sections[dueDate].data.push(currentTask);
      }

    });

    const avoidEmptyData = (Object.values(sections) as TaskSectionListType[])
      ?.filter((e: TaskSectionListType) => e.data?.length > 0);

    const sortedBySection = avoidEmptyData?.sort((a, b) => {
      return new Date(a.section).getTime() - new Date(b.section).getTime()
    })

    const sortedByData = sortedBySection?.map((tempData) => {

      const tempSortedByData = tempData.data?.sort((a, b) => {
        const dateA = a.dueTime ? new Date(a.dueTime).getTime() : Number.MIN_SAFE_INTEGER;
        const dateB = b.dueTime ? new Date(b.dueTime).getTime() : Number.MIN_SAFE_INTEGER;
        return dateA - dateB;
      })

      return { section: tempData.section, data: tempSortedByData }

    })

    setTaskSectionList(sortedByData);
  }

  const renderList = ({ item }: { item: TaskResponseType }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationRoutes.AddTask, {
          task: item
        })}
        activeOpacity={0.75}
        style={{
          borderLeftWidth: 1,
          borderColor: colors.mainText + '64',
          paddingLeft: widthPixel(10)
        }}
      >

        <View
          style={{
            padding: widthPixel(10),
            backgroundColor: colors.contentBackground,
            borderRadius: 6,
            marginVertical: heightPixel(10)
          }}
        >

          <Text
            style={{
              color: colors.mainText,
              fontSize: normalize(14)
            }}
          >
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: !item.dueTime ? 'flex-end' : 'space-between',
              marginTop: heightPixel(5)
            }}
          >

            {item.dueTime &&
              <Text
                style={{
                  color: colors.mainText,
                  fontSize: normalize(11),
                  fontStyle: 'italic',
                }}
              >
                {moment(item.dueTime).format('hh:mm A')}
              </Text>
            }

            <SelectionButton
              value={item.isCompleted}
              onChange={(value) => handleCompleted(value, item.id)}
            />

          </View>

        </View>

      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: TaskSectionListType }) => {
    const color = getColor(section.data?.[0]?.dueDate);
    return (
      <View
        style={[dashboardStyle.sectionContainer, {
          backgroundColor: color + '64',
        }]}
      >

        <Icon
          name={'flag-variant'}
          size={widthPixel(35)}
          color={color}
        />

        <View
          style={{
            marginLeft: 5,
          }}
        >

          <Text
            style={{
              color: colors.mainText
            }}
          >
            {moment(section.section, 'YYYY-MM-DD')
              .format('dddd')}
          </Text>

          <Text
            style={{
              color: colors.mainText
            }}
          >
            {
              moment(section.section, 'YYYY-MM-DD')
                .format('MMM DD, YYYY')
            }
          </Text>

        </View>

      </View>
    );
  };

  const handleCompleted = async (isCompleted: boolean, taskId: string) => {
    await HandleTaskCompletedMutation({
      isCompleted,
      uid: uuid,
      taskId
    })
  }

  useEffect(() => {
    if (tasks != undefined && tasks?.length > 0)
      toSectionList(tasks);
    else setTaskSectionList([]);
  }, [tasks, selectedFiltertype])

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <PrimaryHeader
        leftContentWidth={'100%'}
        leftContent={
          <PopUpMenu
            list={FilterMenulist}
            selectedOptionId={selectedFiltertype?.id}
            containerStyle={{
              width: widthPixel(150)
            }}
          >
            <View
              style={[dashboardStyle.filterContainer, {
                borderColor: colors.primary,
              }]}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colors.primary
                }}
              >
                {selectedFiltertype?.title}
              </Text>
              <Icon
                name='chevron-down'
                color={colors.primary}
                size={widthPixel(18)}
                style={dashboardStyle.filterIcon}
              />
            </View>
          </PopUpMenu>
        }
      />

      <SectionList
        sections={tasksSectionList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderList}
        renderSectionHeader={renderSectionHeader}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        ListEmptyComponent={<EmptyMessage />}
        style={dashboardStyle.sectionList}
        contentContainerStyle={dashboardStyle.sectionListContent}
      />

      <AddButton
        onPress={() => navigation.navigate(navigationRoutes.AddTask)}
        size={60}
        containerStyle={[
          dashboardStyle.addButtonContainer, {
            bottom: widthPixel(10) + inset.bottom,
          }]}
      />

    </View>
  )
}