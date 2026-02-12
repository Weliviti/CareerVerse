import PropTypes from 'prop-types';
import Card from './ui/Card';
import Button from './ui/Button';

/**
 * SimulationHistoryList Component
 * Displays a list of past simulation scores in card format.
 *
 * @param {Object} props
 * @param {Array} props.scores - List of score objects
 */
const SimulationHistoryList = ({ scores = [] }) => {
    // Helper to determine score color
    const getScoreColor = (score) => {
        if (score > 80) return 'text-green-600';
        if (score > 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    if (!scores || scores.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No simulation history available yet.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {scores.map((score, index) => (
                <Card key={score.id || index} shadow="sm">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* Left Side: Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    {new Date(score.date).toLocaleDateString()}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-sm font-medium text-gray-700">
                                    {score.simulationType}
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    {score.totalScore}%
                                </span>
                                <span className={`text-sm font-medium ${getScoreColor(score.totalScore)}`}>
                                    {score.totalScore > 80 ? 'Excellent' : score.totalScore > 50 ? 'Good' : 'Needs Work'}
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Action */}
                        <Button variant="outline" size="sm">
                            View Details
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

SimulationHistoryList.propTypes = {
    scores: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            date: PropTypes.string.isRequired,
            simulationType: PropTypes.string.isRequired,
            totalScore: PropTypes.number.isRequired,
        })
    ),
};

export default SimulationHistoryList;
