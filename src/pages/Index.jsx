import { Container, VStack, Text, Input, Button, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { PDFDownloadLink, Document, Page, Text as PDFText, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const Index = () => {
  const [content, setContent] = useState("");
  const [transactions, setTransactions] = useState("");
  const toast = useToast();

  const handleCreateInvoice = () => {
    if (!content || !transactions) {
      toast({
        title: "Error",
        description: "Please fill all fields to create an invoice.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Simulate invoice creation
    toast({
      title: "Invoice Created",
      description: "Your invoice has been successfully created.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Clear fields
    setContent("");
    setTransactions("");
  };

  const InvoicePDF = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <PDFText>Content: {content}</PDFText>
          <PDFText>Transactions: {transactions}</PDFText>
        </View>
      </Page>
    </Document>
  );

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} as="form" onSubmit={(e) => e.preventDefault()}>
        <Heading as="h1" size="xl">Invoice Creation Tool</Heading>
        <Text fontSize="md">Enter the content and transactions details below to create an invoice.</Text>
        <Input placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Input placeholder="Enter transactions" value={transactions} onChange={(e) => setTransactions(e.target.value)} />
        {content && transactions ? (
          <PDFDownloadLink document={<InvoicePDF />} fileName="invoice.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download Invoice PDF'
            }
          </PDFDownloadLink>
        ) : (
          <Button colorScheme="blue" onClick={handleCreateInvoice}>Create Invoice</Button>
        )}
      </VStack>
    </Container>
  );
};

export default Index;