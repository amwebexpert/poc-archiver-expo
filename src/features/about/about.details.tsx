import { format } from 'date-fns';
import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

import { APP_VERSION_INFO } from '~/constants';

const { AUTHOR, VERSION_DATE_ISO, NAME } = APP_VERSION_INFO;

export const AboutDetails: FunctionComponent = () => {
  const formattedDate = format(new Date(VERSION_DATE_ISO), 'yyyy-MM-dd HH:mm:ss');

  return (
    <DataTable>
      <DataTable.Row>
        <DataTable.Cell>Name:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{NAME}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Author:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{AUTHOR}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>Updated:</DataTable.Cell>
        <DataTable.Cell style={styles.tableValueCell}>{formattedDate}</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

const styles = StyleSheet.create({
  tableValueCell: {
    flex: 2,
  },
});
