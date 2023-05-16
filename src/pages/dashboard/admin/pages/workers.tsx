import { Button, Flex, Title } from "@mantine/core";
import WorkerGroupCard from "../../../../components/adminDashboard/WorkerGroupCard";

const WorkersPage = () => {
    return (
        <div>
            <Flex gap={15} direction="row">
                <Title size="h3">Skupiny zamestancu</Title>

                <Button variant="filled">
                    Pridat
                </Button>
            </Flex>

            <WorkerGroupCard workerCount={20} createdAt={new Date()} color="green" category="fdklfjd" title="flkdjflksd fjsldk f"/>
        </div>
    )
};

export default WorkersPage;