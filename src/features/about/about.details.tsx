import { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';


import { APP_VERSION_INFO } from '~/constants';

const { AUTHOR, VERSION_DATE, NAME } = APP_VERSION_INFO;

export const AboutDetails: FunctionComponent = () => (
  <DataTable>
    <DataTable.Row>
      <DataTable.Cell>Name:</DataTable.Cell>
      <DataTable.Cell style={styles.tableValueCell}>{NAME}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Date:</DataTable.Cell>
      <DataTable.Cell style={styles.tableValueCell}>{VERSION_DATE}</DataTable.Cell>
    </DataTable.Row>
    <DataTable.Row>
      <DataTable.Cell>Author:</DataTable.Cell>
      <DataTable.Cell style={styles.tableValueCell}>{AUTHOR}</DataTable.Cell>
    </DataTable.Row>
  </DataTable>
);

const styles = StyleSheet.create({
  tableValueCell: {
    flex: 2,
  },
});
