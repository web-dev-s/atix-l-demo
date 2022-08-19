import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {chevron} from '../assets';
import {
  CSV_CELL_SEPARATOR,
  CSV_ROW_SEPARATOR,
  DocumentObjectType,
} from '../utils';

export const RenderDocument = React.memo(
  (props: {csv: DocumentObjectType; orderNb: number}) => {
    const {csv, orderNb} = props;
    const [collapsed, setCollapsed] = React.useState<boolean>(true);

    const docRows = csv.data?.split(CSV_ROW_SEPARATOR);
    const docColumns = csv?.header?.split(CSV_CELL_SEPARATOR);

    return (
      <View style={styles.itemContainer}>
        <Pressable
          style={styles.headerContainer}
          onPress={() => {
            setCollapsed(c => !c);
          }}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              {orderNb + '. '}
              {csv.name}
            </Text>
          </View>
          <Image
            style={[
              styles.headerChevron,
              {transform: [{rotate: collapsed ? '0deg' : '180deg'}]},
            ]}
            source={chevron}
          />
        </Pressable>
        {!collapsed && docColumns?.length && (
          <View style={styles.table}>
            <View
              style={[styles.tableHeaderRow, , {flex: 1 / docColumns.length}]}>
              {docColumns?.map((it, ind) => (
                <View
                  key={'header-cell' + ind}
                  style={[
                    styles.tableHeaderCell,
                    {flex: 1 / docColumns.length},
                  ]}>
                  <Text style={styles.tableHeaderCellText}>{it}</Text>
                </View>
              ))}
            </View>
            {docRows?.map((row, index) => {
              const docrowColumns = row?.split(CSV_CELL_SEPARATOR);
              return (
                <View
                  key={'data-row' + index}
                  style={[styles.tableDataRow, {flex: 1 / docRows.length}]}>
                  {docrowColumns.map((it, idx) => (
                    <View
                      key={'data-cell' + index + '-' + idx}
                      style={[
                        styles.tableDataCell,
                        {flex: 1 / docrowColumns.length},
                      ]}>
                      <Text style={styles.tableDataCellText}>{it}</Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  },
);
const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    minHeight: 30,
    marginBottom: 2,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  headerContainer: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 30,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  headerText: {
    color: 'midnightblue',
    textAlign: 'left',
    fontWeight: '900',
    textAlignVertical: 'center',
    tintColor: 'midnightblue',
  },
  headerChevron: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  table: {
    borderColor: 'deepskyblue',
    borderWidth: 2,
    marginVertical: 10,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    borderColor: 'deepskyblue',
    borderBottomWidth: 1,
    marginBottom: -2,
  },
  tableHeaderCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    borderColor: 'deepskyblue',
    borderWidth: 0.5,
    padding: 2,
  },
  tableHeaderCellText: {
    color: 'blue',
    paddingTop: 5,
    textAlign: 'left',
    fontWeight: '600',
  },
  tableDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  tableDataCell: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    borderColor: 'darkgrey',
    borderWidth: 0.5,
    padding: 2,
  },
  tableDataCellText: {
    color: 'midnightblue',
    paddingTop: 5,
    textAlign: 'left',
    fontWeight: '200',
  },
});
